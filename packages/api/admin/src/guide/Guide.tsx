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
import { CategorySelect } from "../category/CategorySelect";
import { UserSelect } from "../user/UserSelect";
import { DeviceSelect } from "../device/DeviceSelect";
import { Guide as TGuide } from "../api/guide/Guide";
import { GuideUpdateInput } from "../api/guide/GuideUpdateInput";

export const Guide = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/guides/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TGuide,
    AxiosError,
    [string, string]
  >(["get-/api/guides", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/guides"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TGuide, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/guides"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//guides");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TGuide, AxiosError, GuideUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/guides"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: GuideUpdateInput) => {
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
    () =>
      pick(data, [
        "obsolete",
        "title",
        "conclusion",
        "publishedOn",
        "introduction",
        "type",
        "category",
        "user",
        "device",
      ]),
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
                title={`${"Guide"} ${
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
              <TextField
                type="datetime-local"
                label="Obsolete"
                name="obsolete"
              />
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
