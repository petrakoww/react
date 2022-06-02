import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "./userSlice";

export function IndexUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = user.status === "loading";

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleDeleteClick(id) {
    return async () => {
      await dispatch(deleteUser(id));
      await dispatch(getUsers());
    };
  }

  return (
    <>
      <h1>Потребители</h1>
      <Button className="mb-2" variant="success" as={Link} to="/users/create">
        Добави потребител
      </Button>
      {isLoading ? (
        <h1>Зареждане...</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>№</th>
              <th>Име</th>
              <th>Имейл</th>
              <th>Телефонен номер</th>
              <th className="text-center">Инструменти</th>
            </tr>
          </thead>
          <tbody>
            {user?.data?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  -
                </td>
              </tr>
            )}
            {user.data.map((user) => (
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td>{user?.fullName}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td className="d-flex justify-content-around">
                  <Button
                    variant="info"
                    as={Link}
                    to={"/users/" + user?.id}
                  >
                    Преглед
                  </Button>
                  <Button
                    variant="secondary"
                    as={Link}
                    to={"/users/" + user?.id + "/edit"}
                  >
                    Редактирай
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={handleDeleteClick(user?.id)}
                  >
                    Изтрий
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
