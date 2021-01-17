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
import { UserSelect } from "../user/UserSelect";
import { DeviceSelect } from "../device/DeviceSelect";
import { Guide } from "../api/guide/Guide";
import { GuideCreateInput } from "../api/guide/GuideCreateInput";

const INITIAL_VALUES = {} as GuideCreateInput;

export const CreateGuide = (): React.ReactElement => {
  useBreadcrumbs("/guides/new", "Create Guide");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Guide,
    AxiosError,
    GuideCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/guides", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/guides"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: GuideCreateInput) => {
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
            <FormHeader title={"Create Guide"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="datetime-local" label="Obsolete" name="obsolete" />
          </div>
          <div>
            <TextField label="Title" name="title" />
          </div>
          <div>
            <TextField label="Conclusion" name="conclusion" textarea />
          </div>
          <div>
            <TextField type="date" label="Published On" name="publishedOn" />
          </div>
          <div>
            <TextField label="Introduction" name="introduction" textarea />
          </div>
          <div>
            <TextField label="Type" name="type" />
          </div>
          <div>
            <CategorySelect label="Category" name="category.id" />
          </div>
          <div>
            <UserSelect label="User" name="user.id" />
          </div>
          <div>
            <DeviceSelect label="Device" name="device.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
