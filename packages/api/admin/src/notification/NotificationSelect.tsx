import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Notification } from "../api/notification/Notification";

type Data = Notification[];

type Props = Omit<SelectFieldProps, "options">;

export const NotificationSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/notifications",
    async () => {
      const response = await api.get("/api/notifications");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.data && item.data.length ? item.data : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
