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
import { StepSelect } from "../step/StepSelect";
import { Line } from "../api/line/Line";
import { LineCreateInput } from "../api/line/LineCreateInput";

const INITIAL_VALUES = {} as LineCreateInput;

export const CreateLine = (): React.ReactElement => {
  useBreadcrumbs("/lines/new", "Create Line");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Line,
    AxiosError,
    LineCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/lines", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/lines"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: LineCreateInput) => {
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
            <FormHeader title={"Create Line"}>
              <Button type="submit" disabled={isLoading}>
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
            <TextField type="number" step={1} label="Order by" name="orderBy" />
          </div>
          <div>
            <StepSelect label="Step" name="step.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
