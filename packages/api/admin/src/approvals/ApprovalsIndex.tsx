import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ApprovalsList } from "./ApprovalsList";
import { CreateApprovals } from "./CreateApprovals";
import { Approvals } from "./Approvals";

export const ApprovalsIndex = (): React.ReactElement => {
  useBreadcrumbs("/approvals/", "Approvals");

  return (
    <Switch>
      <PrivateRoute exact path={"/approvals/"} component={ApprovalsList} />
      <PrivateRoute path={"/approvals/new"} component={CreateApprovals} />
      <PrivateRoute path={"/approvals/:id"} component={Approvals} />
    </Switch>
  );
};
