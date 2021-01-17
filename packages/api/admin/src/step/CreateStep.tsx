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
import { GuideSelect } from "../guide/GuideSelect";
import { Step } from "../api/step/Step";
import { StepCreateInput } from "../api/step/StepCreateInput";

const INITIAL_VALUES = {} as StepCreateInput;

export const CreateStep = (): React.ReactElement => {
  useBreadcrumbs("/steps/new", "Create Step");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Step,
    AxiosError,
    StepCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/steps", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/steps"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StepCreateInput) => {
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
            <FormHeader title={"Create Step"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Title" name="title" />
          </div>
          <div>
            <TextField type="number" step={1} label="Order by" name="orderBy" />
          </div>
          <div>
            <GuideSelect label="Guide" name="guide.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
