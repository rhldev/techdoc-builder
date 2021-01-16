import React, { useCallback, useContext } from "react";
import { Route, Switch, useHistory, Link, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { Credentials, setCredentials, removeCredentials } from "./auth";
import {
  Menu,
  MainLayout,
  Page,
  CircleBadge,
  Breadcrumbs,
} from "@amplication/design-system";
import BreadcrumbsContext from "./components/breadcrumbs/BreadcrumbsContext";
import BreadcrumbsProvider from "./components/breadcrumbs/BreadcrumbsProvider";
import useBreadcrumbs from "./components/breadcrumbs/use-breadcrumbs";
import PrivateRoute from "./components/PrivateRoute";
import { UserIndex } from "./user/UserIndex";
import { TypesIndex } from "./types/TypesIndex";
import { CategoryIndex } from "./category/CategoryIndex";
import { ApprovalsIndex } from "./approvals/ApprovalsIndex";
import { DeviceIndex } from "./device/DeviceIndex";
import { GuideIndex } from "./guide/GuideIndex";
import { LineIndex } from "./line/LineIndex";
import { StepIndex } from "./step/StepIndex";
import { NotificationIndex } from "./notification/NotificationIndex";

const App = (): React.ReactElement => {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );

  return (
    <BreadcrumbsProvider>
      <MainLayout>
        <Switch>
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/" component={AppLayout} />
        </Switch>
      </MainLayout>
    </BreadcrumbsProvider>
  );
};

export default App;

/**@todo: move to a separate template file */
const AppLayout = (): React.ReactElement => {
  const history = useHistory();
  useBreadcrumbs("/", "techdoc-builder");
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const signOut = useCallback(() => {
    removeCredentials();
    history.push("/login");
  }, [history]);

  // Use navLink for breadcrumbs to prevent page reload
  const ItemLink = ({ href, ...rest }: { href: string }) => (
    <NavLink {...rest} to={href} />
  );

  return (
    <>
      <Menu
        onSignOutClick={signOut}
        logoContent={
          <Link to="/">
            <CircleBadge name={"techdoc-builder"} />
          </Link>
        }
      ></Menu>
      <MainLayout.Content>
        <Breadcrumbs>
          {}
          {breadcrumbsContext.breadcrumbsItems.map((item, index, items) => (
            <Breadcrumbs.Item
              as={ItemLink}
              key={index}
              selected={index + 1 === items.length}
              href={item.url}
            >
              {item.name}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Page>
          <Switch>
            <PrivateRoute exact path="/" component={Navigation} />
            <PrivateRoute path="/users" component={UserIndex} />
            <PrivateRoute path="/types" component={TypesIndex} />
            <PrivateRoute path="/categories" component={CategoryIndex} />
            <PrivateRoute path="/approvals" component={ApprovalsIndex} />
            <PrivateRoute path="/devices" component={DeviceIndex} />
            <PrivateRoute path="/guides" component={GuideIndex} />
            <PrivateRoute path="/lines" component={LineIndex} />
            <PrivateRoute path="/steps" component={StepIndex} />
            <PrivateRoute path="/notifications" component={NotificationIndex} />
          </Switch>
        </Page>
      </MainLayout.Content>
    </>
  );
};
