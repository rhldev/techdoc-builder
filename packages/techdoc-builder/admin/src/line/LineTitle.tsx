import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Line } from "../api/line/Line";

type Props = { id: string };

export const LineTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Line,
    AxiosError,
    [string, string]
  >(["get-/api/lines", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/lines"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/lines"}/${id}`} className="entity-id">
      {data?.bullet && data?.bullet.length ? data.bullet : data?.id}
    </Link>
  );
};
