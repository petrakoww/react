import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { PageCar } from "./features/car/PageCar";
import { PageUser } from "./features/user/PageUser";
import { RentPage } from "./features/rent/RentPage";

export function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/cars">
              Автомобили
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Потребители
            </Nav.Link>
            <Nav.Link as={Link} to="/rents">
              Наеми
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/cars">
            <PageCar />
          </Route>
          <Route path="/users">
            <PageUser />
          </Route>
          <Route path="/rents">
            <RentPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/cars" />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
