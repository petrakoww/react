import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { editUser, getUser } from "./userSlice";

export function EditUser() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: user.entity,
  });
  const isLoading = user.status === "loading";

  async function onSubmit(data) {
    await dispatch(editUser({ id, data }));
    history.push("/users");
  }

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  useEffect(() => {
    reset(user.entity);
  }, [reset, user.entity]);

  if (isLoading) {
    return <h1>Зареждане...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Редактирай потребител</h1>

      <Form.Group controlId="fullName">
        <Form.Label>Име</Form.Label>
        <Form.Control {...register("fullName")} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Имейл</Form.Label>
        <Form.Control {...register("email")} />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Телефонен номер</Form.Label>
        <Form.Control {...register("phoneNumber")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Редактирай
      </Button>
    </Form>
  );
}
