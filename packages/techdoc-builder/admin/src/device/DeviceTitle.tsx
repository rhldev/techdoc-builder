import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Device } from "../api/device/Device";

type Props = { id: string };

export const DeviceTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Device,
    AxiosError,
    [string, string]
  >(["get-/api/devices", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/devices"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/devices"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
