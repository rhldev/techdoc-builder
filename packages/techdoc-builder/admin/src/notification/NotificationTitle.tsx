import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Notification } from "../api/notification/Notification";

type Props = { id: string };

export const NotificationTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Notification,
    AxiosError,
    [string, string]
  >(["get-/api/notifications", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/notifications"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/notifications"}/${id}`} className="entity-id">
      {data?.data && data?.data.length ? data.data : data?.id}
    </Link>
  );
};
