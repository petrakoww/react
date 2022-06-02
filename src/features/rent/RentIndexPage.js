import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { getCars } from "../car/carSlice";
import { getRents } from "./rentSlice";
import { getUsers } from "../user/userSlice";

export function RentIndexPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const car = useSelector((state) => state.car);
  const rent = useSelector((state) => state.rent);
  const isLoading =
    user.status === "loading" ||
    car.status === "loading" ||
    rent.status === "loading";

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCars());
    dispatch(getRents());
  }, [dispatch]);

  return (
    <>
      <h1>Наеми</h1>
      {isLoading ? (
        <h1>Зареждане...</h1>
      ) : (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>№</th>
              <th>Потребител</th>
              <th>Автомобил</th>
              <th>Начало</th>
              <th>Край</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {rent?.data?.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">
                  -
                </td>
              </tr>
            )}

            {rent.data.map((rent) => {
              const currentUser = user.data.find(
                (x) => x.id === rent?.userID
              );
              const currentCar = car.data.find(
                (x) => x.id === rent?.carID
              );

              return (
                <tr key={rent?.id}>
                  <td>{rent?.id}</td>
                  <td>{currentUser?.fullName}</td>
                  <td>
                    {currentCar?.brand} {currentCar?.model}
                  </td>
                  <td>{moment(rent?.startDateTime).format("MMMM d, yyyy HH:mm")}</td>
                  <td>{moment(rent?.endDateTime).format("MMMM d, yyyy HH:mm")}</td>
                  <td>{rent?.price} лв.</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
