import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { LineList } from "./LineList";
import { CreateLine } from "./CreateLine";
import { Line } from "./Line";

export const LineIndex = (): React.ReactElement => {
  useBreadcrumbs("/lines/", "Lines");

  return (
    <Switch>
      <PrivateRoute exact path={"/lines/"} component={LineList} />
      <PrivateRoute path={"/lines/new"} component={CreateLine} />
      <PrivateRoute path={"/lines/:id"} component={Line} />
    </Switch>
  );
};
