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
import { UserSelect } from "../user/UserSelect";
import { Approvals as TApprovals } from "../api/approvals/Approvals";
import { ApprovalsUpdateInput } from "../api/approvals/ApprovalsUpdateInput";

export const Approvals = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/approvals/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TApprovals,
    AxiosError,
    [string, string]
  >(["get-/api/approvals", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/approvals"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TApprovals, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/approvals"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//approvals");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TApprovals, AxiosError, ApprovalsUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/approvals"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: ApprovalsUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.changeData);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, ["changeData", "guide", "originalData", "owner", "requestor"]),
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
                title={`${"Approvals"} ${
                  data?.changeData && data?.changeData.length
                    ? data.changeData
                    : data?.id
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
              <TextField label="Change data" name="changeData" />
            </div>
            <div>
              <GuideSelect label="Guide" name="guide.id" />
            </div>
            <div>
              <TextField label="Original data" name="originalData" />
            </div>
            <div>
              <UserSelect label="Owner" name="owner.id" />
            </div>
            <div>
              <UserSelect label="Requestor" name="requestor.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
