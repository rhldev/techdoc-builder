import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Device } from "../api/device/Device";

type Data = Device[];

type Props = Omit<SelectFieldProps, "options">;

export const DeviceSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/devices",
    async () => {
      const response = await api.get("/api/devices");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
