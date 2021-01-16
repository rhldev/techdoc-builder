import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Approvals } from "../api/approvals/Approvals";

type Data = Approvals[];

type Props = Omit<SelectFieldProps, "options">;

export const ApprovalsSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/approvals",
    async () => {
      const response = await api.get("/api/approvals");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.changeData && item.changeData.length
              ? item.changeData
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
