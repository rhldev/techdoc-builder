import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Category } from "../api/category/Category";

type Props = { id: string };

export const CategoryTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Category,
    AxiosError,
    [string, string]
  >(["get-/api/categories", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/categories"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/categories"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
