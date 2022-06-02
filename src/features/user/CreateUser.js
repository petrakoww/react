import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { createUser } from "./userSlice";

export function CreateUser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    await dispatch(createUser(data));
    history.push("/users");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Добави потребител</h1>

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
        Добави
      </Button>
    </Form>
  );
}
