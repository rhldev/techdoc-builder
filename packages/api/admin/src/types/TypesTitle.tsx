import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Types } from "../api/types/Types";

type Props = { id: string };

export const TypesTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Types,
    AxiosError,
    [string, string]
  >(["get-/api/types", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/types"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/types"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
