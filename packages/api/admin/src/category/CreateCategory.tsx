import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Category } from "../api/category/Category";
import { CategoryCreateInput } from "../api/category/CategoryCreateInput";

const INITIAL_VALUES = {} as CategoryCreateInput;

export const CreateCategory = (): React.ReactElement => {
  useBreadcrumbs("/categories/new", "Create Category");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Category,
    AxiosError,
    CategoryCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/categories", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/categories"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CategoryCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Category"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
