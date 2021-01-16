import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DeviceList } from "./DeviceList";
import { CreateDevice } from "./CreateDevice";
import { Device } from "./Device";

export const DeviceIndex = (): React.ReactElement => {
  useBreadcrumbs("/devices/", "Devices");

  return (
    <Switch>
      <PrivateRoute exact path={"/devices/"} component={DeviceList} />
      <PrivateRoute path={"/devices/new"} component={CreateDevice} />
      <PrivateRoute path={"/devices/:id"} component={Device} />
    </Switch>
  );
};
