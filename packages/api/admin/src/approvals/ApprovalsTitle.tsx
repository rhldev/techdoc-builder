import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Approvals } from "../api/approvals/Approvals";

type Props = { id: string };

export const ApprovalsTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Approvals,
    AxiosError,
    [string, string]
  >(["get-/api/approvals", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/approvals"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/approvals"}/${id}`} className="entity-id">
      {data?.changeData && data?.changeData.length ? data.changeData : data?.id}
    </Link>
  );
};
