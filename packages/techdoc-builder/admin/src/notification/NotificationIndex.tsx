import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { NotificationList } from "./NotificationList";
import { CreateNotification } from "./CreateNotification";
import { Notification } from "./Notification";

export const NotificationIndex = (): React.ReactElement => {
  useBreadcrumbs("/notifications/", "Notifications");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/notifications/"}
        component={NotificationList}
      />
      <PrivateRoute
        path={"/notifications/new"}
        component={CreateNotification}
      />
      <PrivateRoute path={"/notifications/:id"} component={Notification} />
    </Switch>
  );
};
