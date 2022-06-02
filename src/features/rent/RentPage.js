import React from "react";
import { Switch, Route } from "react-router-dom";

import { RentCreatePage } from "./RentCreatePage";
import { RentIndexPage } from "./RentIndexPage";

export function RentPage() {
  return (
    <Switch>
      <Route exact path="/rents">
        <RentIndexPage />
      </Route>
      <Route path="/rents/:id/create">
        <RentCreatePage />
      </Route>
    </Switch>
  );
}
