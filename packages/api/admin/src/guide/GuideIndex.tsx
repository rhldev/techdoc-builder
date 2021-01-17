import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GuideList } from "./GuideList";
import { CreateGuide } from "./CreateGuide";
import { Guide } from "./Guide";

export const GuideIndex = (): React.ReactElement => {
  useBreadcrumbs("/guides/", "Guides");

  return (
    <Switch>
      <PrivateRoute exact path={"/guides/"} component={GuideList} />
      <PrivateRoute path={"/guides/new"} component={CreateGuide} />
      <PrivateRoute path={"/guides/:id"} component={Guide} />
    </Switch>
  );
};
