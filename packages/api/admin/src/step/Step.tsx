import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GuideSelect } from "../guide/GuideSelect";
import { Step as TStep } from "../api/step/Step";
import { StepUpdateInput } from "../api/step/StepUpdateInput";

export const Step = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/steps/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TStep,
    AxiosError,
    [string, string]
  >(["get-/api/steps", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/steps"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TStep, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/steps"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//steps");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TStep, AxiosError, StepUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/steps"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: StepUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["title", "orderBy", "guide"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Step"} ${
                  data?.title && data?.title.length ? data.title : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="Title" name="title" />
            </div>
            <div>
              <TextField
                type="number"
                step={1}
                label="Order by"
                name="orderBy"
              />
            </div>
            <div>
              <GuideSelect label="Guide" name="guide.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
