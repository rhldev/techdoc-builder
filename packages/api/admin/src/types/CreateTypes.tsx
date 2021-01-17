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
import { Types } from "../api/types/Types";
import { TypesCreateInput } from "../api/types/TypesCreateInput";

const INITIAL_VALUES = {} as TypesCreateInput;

export const CreateTypes = (): React.ReactElement => {
  useBreadcrumbs("/types/new", "Create Type");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Types,
    AxiosError,
    TypesCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/types", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/types"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TypesCreateInput) => {
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
            <FormHeader title={"Create Type"}>
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
