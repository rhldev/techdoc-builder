import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CategoryList } from "./CategoryList";
import { CreateCategory } from "./CreateCategory";
import { Category } from "./Category";

export const CategoryIndex = (): React.ReactElement => {
  useBreadcrumbs("/categories/", "Categories");

  return (
    <Switch>
      <PrivateRoute exact path={"/categories/"} component={CategoryList} />
      <PrivateRoute path={"/categories/new"} component={CreateCategory} />
      <PrivateRoute path={"/categories/:id"} component={Category} />
    </Switch>
  );
};
