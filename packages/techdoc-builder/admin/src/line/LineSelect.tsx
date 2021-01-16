import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Line } from "../api/line/Line";

type Data = Line[];

type Props = Omit<SelectFieldProps, "options">;

export const LineSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/lines", async () => {
    const response = await api.get("/api/lines");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.bullet && item.bullet.length ? item.bullet : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
