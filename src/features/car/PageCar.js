import React from "react";
import { Switch, Route } from "react-router-dom";

import { CreateCar } from "./CreateCar";
import { EditCar } from "./EditCar";
import { IndexCar } from "./IndexCar";
import { DetailCar } from "./DetailCar";

export function PageCar() {
  return (
    <Switch>
      <Route path="/cars/create">
        <CreateCar />
      </Route>
      <Route exact path="/cars">
        <IndexCar />
      </Route>
      <Route exact path="/cars/:id">
        <DetailCar />
      </Route>
      <Route exact path="/cars/:id/edit">
        <EditCar />
      </Route>
    </Switch>
  );
}
