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
import { StepSelect } from "../step/StepSelect";
import { Line as TLine } from "../api/line/Line";
import { LineUpdateInput } from "../api/line/LineUpdateInput";

export const Line = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/lines/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TLine,
    AxiosError,
    [string, string]
  >(["get-/api/lines", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/lines"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TLine, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/lines"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//lines");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TLine, AxiosError, LineUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/lines"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: LineUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.bullet);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["text", "bullet", "level", "orderBy", "step"]),
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
                title={`${"Line"} ${
                  data?.bullet && data?.bullet.length ? data.bullet : data?.id
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
              <TextField label="Text" name="text" textarea />
            </div>
            <div>
              <TextField label="Bullet" name="bullet" />
            </div>
            <div>
              <TextField type="number" step={1} label="Level" name="level" />
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
              <StepSelect label="Step" name="step.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
