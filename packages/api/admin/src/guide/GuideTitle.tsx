import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Guide } from "../api/guide/Guide";

type Props = { id: string };

export const GuideTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Guide,
    AxiosError,
    [string, string]
  >(["get-/api/guides", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/guides"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/guides"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
