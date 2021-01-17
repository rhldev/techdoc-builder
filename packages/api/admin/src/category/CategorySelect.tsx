import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Category } from "../api/category/Category";

type Data = Category[];

type Props = Omit<SelectFieldProps, "options">;

export const CategorySelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/categories",
    async () => {
      const response = await api.get("/api/categories");
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
