import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Step } from "../api/step/Step";

type Props = { id: string };

export const StepTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Step,
    AxiosError,
    [string, string]
  >(["get-/api/steps", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/steps"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/steps"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
