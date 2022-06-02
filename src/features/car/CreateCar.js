import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getCarTypes } from "../car-type/carTypeSlice";
import { getFuelTypes } from "../fuel-type/fuelTypeSlice";
import { createCar } from "./carSlice";

export function CreateCar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const carType = useSelector((state) => state.carType);
  const fuelType = useSelector((state) => state.fuelType);
  const { register, handleSubmit } = useForm();
  const isLoading =
    carType.status === "loading" || fuelType.status === "loading";

  async function onSubmit(data) {
    const serializedData = { ...data };

    if (serializedData.carTypeID !== "") {
      serializedData.carTypeID = Number(serializedData.carTypeID);
    }

    if (serializedData.fuelTypeID !== "") {
      serializedData.fuelTypeID = Number(serializedData.fuelTypeID);
    }

    await dispatch(createCar(serializedData));
    history.push("/cars");
  }

  useEffect(() => {
    dispatch(getCarTypes());
    dispatch(getFuelTypes());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Зареждане...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Добави автомобил</h1>

      <Form.Group controlId="carTypeID">
        <Form.Label>Тип</Form.Label>
        <Form.Control as="select" {...register("carTypeID")}>
          <option value="" defaultValue>
            Изберте тип автомобил
          </option>
          {carType.data.map((carType) => (
            <option key={carType.id} value={carType.id}>
              {carType.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="brand">
        <Form.Label>Марка</Form.Label>
        <Form.Control {...register("brand")} />
      </Form.Group>

      <Form.Group controlId="model">
        <Form.Label>Модел</Form.Label>
        <Form.Control {...register("model")} />
      </Form.Group>

      <Form.Group controlId="fuelTypeID">
        <Form.Label>Гориво</Form.Label>
        <Form.Control as="select" {...register("fuelTypeID")}>
          <option value="" defaultValue>
            Изберте вид гориво
          </option>
          {fuelType.data.map((fuelType) => (
            <option key={fuelType.id} value={fuelType.id}>
              {fuelType.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="numberOfSeats">
        <Form.Label>Брой места</Form.Label>
        <Form.Control {...register("numberOfSeats")} />
      </Form.Group>

      <Form.Group controlId="pictureUrl">
        <Form.Label>Снимка (link)</Form.Label>
        <Form.Control {...register("pictureUrl")} />
      </Form.Group>

      <Form.Group controlId="pricePerDay">
        <Form.Label>Цена за ден</Form.Label>
        <Form.Control {...register("pricePerDay")} />
      </Form.Group>

      <Form.Group controlId="count">
        <Form.Label>Брой</Form.Label>
        <Form.Control {...register("count")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Добави
      </Button>
    </Form>
  );
}
