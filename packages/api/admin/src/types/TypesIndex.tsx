import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TypesList } from "./TypesList";
import { CreateTypes } from "./CreateTypes";
import { Types } from "./Types";

export const TypesIndex = (): React.ReactElement => {
  useBreadcrumbs("/types/", "Types");

  return (
    <Switch>
      <PrivateRoute exact path={"/types/"} component={TypesList} />
      <PrivateRoute path={"/types/new"} component={CreateTypes} />
      <PrivateRoute path={"/types/:id"} component={Types} />
    </Switch>
  );
};
