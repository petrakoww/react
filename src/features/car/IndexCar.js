import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCar, getCars } from "./carSlice";
import { getCarTypes } from "../car-type/carTypeSlice";
import { getFuelTypes } from "../fuel-type/fuelTypeSlice";

export function IndexCar() {
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
    dispatch(getCars());
  }, [dispatch]);

  function handleDeleteClick(id) {
    return async () => {
      await dispatch(deleteCar(id));
      await dispatch(getCars());
    };
  }

  return (
    <>
      <h1>Автомобили</h1>
      <Button className="mb-2" variant="success" as={Link} to="/cars/create">
        Добави автомобил
      </Button>
      {isLoading ? (
        <h1>Зареждане...</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>№</th>
              <th>Тип</th>
              <th>Марка</th>
              <th>Модел</th>
              <th>Гориво</th>
              <th>Брой места</th>
              <th>Цена за ден</th>
              <th>Брой</th>
              <th className="text-center">Инструменти</th>
            </tr>
          </thead>
          <tbody>
            {car?.data?.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">
                  -
                </td>
              </tr>
            )}

            {car.data.map((car) => {
              const currentCarType = carType.data.find(
                (x) => x.id === car?.carTypeID
              );
              const currentFuelType = fuelType.data.find(
                (x) => x.id === car?.fuelTypeID
              );

              return (
                <tr key={car?.id}>
                  <td>{car?.id}</td>
                  <td>{currentCarType?.name}</td>
                  <td>{car?.brand}</td>
                  <td>{car?.model}</td>
                  <td>{currentFuelType?.name}</td>
                  <td>{car?.numberOfSeats}</td>
                  <td>{car?.pricePerDay}</td>
                  <td>{car?.count}</td>
                  <td className="d-flex">
                    <Button 
                      variant="info"
                      as={Link}
                      to={"/cars/" + car?.id}
                    >
                      Преглед
                    </Button>
                    <Button className="ml-1 mr-1"
                      variant="success"
                      as={Link}
                      to={"/rents/" + car?.id + "/create"}
                    >
                      Наеми
                    </Button>
                    <Button className="mr-1"
                      variant="secondary"
                      as={Link}
                      to={"/cars/" + car?.id + "/edit"}
                    >
                      Редактирай
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={handleDeleteClick(car?.id)}
                    >
                      Изтрий
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
