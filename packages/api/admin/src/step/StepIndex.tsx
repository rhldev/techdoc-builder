import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StepList } from "./StepList";
import { CreateStep } from "./CreateStep";
import { Step } from "./Step";

export const StepIndex = (): React.ReactElement => {
  useBreadcrumbs("/steps/", "Steps");

  return (
    <Switch>
      <PrivateRoute exact path={"/steps/"} component={StepList} />
      <PrivateRoute path={"/steps/new"} component={CreateStep} />
      <PrivateRoute path={"/steps/:id"} component={Step} />
    </Switch>
  );
};
