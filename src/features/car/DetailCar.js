import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCar } from "./carSlice";
import { getCarTypes } from "../car-type/carTypeSlice";
import { getFuelTypes } from "../fuel-type/fuelTypeSlice";

export function DetailCar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carType = useSelector((state) => state.carType);
  const fuelType = useSelector((state) => state.fuelType);
  const car = useSelector((state) => state.car);
  const isLoading =
    carType.status === "loading" ||
    fuelType.status === "loading" ||
    car.status === "loading";

  useEffect(() => {
    dispatch(getCarTypes());
    dispatch(getFuelTypes());
    dispatch(getCar(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Зареждане...</h1>;
  }

  const currentCarType = carType?.data?.find?.(
    (x) => x.id === car?.entity?.carTypeID
  );
  const currentFuelType = fuelType?.data?.find?.(
    (x) => x.id === car?.entity?.fuelTypeID
  );

  return (
    <>
      <h1>
        {car?.entity?.brand} {car?.entity?.model}
      </h1>
      <Row>
        <Col sm="12">
          <Image src={car?.entity?.pictureUrl} rounded fluid />
        </Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Тип</strong>
        </Col>
        <Col sm="10">{currentCarType?.name}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Марка</strong>
        </Col>
        <Col sm="10">{car?.entity?.brand}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Модел</strong>
        </Col>
        <Col sm="10">{car?.entity?.model}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Гориво</strong>
        </Col>
        <Col sm="10">{currentFuelType?.name}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Брой места</strong>
        </Col>
        <Col sm="10">{car?.entity?.numberOfSeats}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Цена за ден</strong>
        </Col>
        <Col sm="10">{car?.entity?.pricePerDay}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Брой</strong>
        </Col>
        <Col sm="10">{car?.entity?.count}</Col>
      </Row>
    </>
  );
}
