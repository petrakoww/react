import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUser } from "./userSlice";

export function DetailUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = user.status === "loading";

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Зареждане...</h1>;
  }

  return (
    <>
      <h1>{user?.entity?.fullName}</h1>
      <Row>
        <Col sm="2">
          <strong>Имейл</strong>
        </Col>
        <Col sm="10">{user?.entity?.email}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Телефонен номер</strong>
        </Col>
        <Col sm="10">{user?.entity?.phoneNumber}</Col>
      </Row>
    </>
  );
}
