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
import { UserSelect } from "../user/UserSelect";
import { Approvals } from "../api/approvals/Approvals";
import { ApprovalsCreateInput } from "../api/approvals/ApprovalsCreateInput";

const INITIAL_VALUES = {} as ApprovalsCreateInput;

export const CreateApprovals = (): React.ReactElement => {
  useBreadcrumbs("/approvals/new", "Create Approvals");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Approvals,
    AxiosError,
    ApprovalsCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/approvals", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/approvals"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ApprovalsCreateInput) => {
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
            <FormHeader title={"Create Approvals"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
