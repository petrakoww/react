import React from "react";
import { Switch, Route } from "react-router-dom";

import { CreateUser } from "./CreateUser";
import { EditUser } from "./EditUser";
import { IndexUser } from "./IndexUser";
import { DetailUser } from "./DetailUser";

export function PageUser() {
  return (
    <Switch>
      <Route path="/users/create">
        <CreateUser />
      </Route>
      <Route exact path="/users">
        <IndexUser />
      </Route>
      <Route exact path="/users/:id">
        <DetailUser />
      </Route>
      <Route exact path="/users/:id/edit">
        <EditUser />
      </Route>
    </Switch>
  );
}
