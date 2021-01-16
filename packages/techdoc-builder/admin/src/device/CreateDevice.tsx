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
import { CategorySelect } from "../category/CategorySelect";
import { Device } from "../api/device/Device";
import { DeviceCreateInput } from "../api/device/DeviceCreateInput";

const INITIAL_VALUES = {} as DeviceCreateInput;

export const CreateDevice = (): React.ReactElement => {
  useBreadcrumbs("/devices/new", "Create Device");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Device,
    AxiosError,
    DeviceCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/devices", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/devices"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DeviceCreateInput) => {
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
            <FormHeader title={"Create Device"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="name" name="name" />
          </div>
          <div>
            <CategorySelect label="Category" name="category.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
