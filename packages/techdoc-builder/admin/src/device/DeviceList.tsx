import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { CategoryTitle } from "../category/CategoryTitle";
import { Device } from "../api/device/Device";

type Data = Device[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "name",
    title: "name",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "category",
    title: "Category",
    sortable: false,
  },
];

export const DeviceList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/devices",
    async () => {
      const response = await api.get("/api/devices");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Devices"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/devices/new"}>
            <Button>Create Device </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Device) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/devices"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.name}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <CategoryTitle id={item.category?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
