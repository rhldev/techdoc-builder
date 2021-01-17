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
import { Notification } from "../api/notification/Notification";
import { NotificationCreateInput } from "../api/notification/NotificationCreateInput";

const INITIAL_VALUES = {} as NotificationCreateInput;

export const CreateNotification = (): React.ReactElement => {
  useBreadcrumbs("/notifications/new", "Create Notification");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Notification,
    AxiosError,
    NotificationCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/notifications", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/notifications"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: NotificationCreateInput) => {
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
            <FormHeader title={"Create Notification"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Data" name="data" />
          </div>
          <div>
            <TextField type="datetime-local" label="Read on" name="readOn" />
          </div>
          <div>
            <TextField label="Type" name="type" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
