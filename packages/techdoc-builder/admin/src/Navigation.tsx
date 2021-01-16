import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Types" to="/types" />
      <NavigationItem name="Categories" to="/categories" />
      <NavigationItem name="Approvals" to="/approvals" />
      <NavigationItem name="Devices" to="/devices" />
      <NavigationItem name="Guides" to="/guides" />
      <NavigationItem name="Lines" to="/lines" />
      <NavigationItem name="Steps" to="/steps" />
      <NavigationItem name="Notifications" to="/notifications" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
