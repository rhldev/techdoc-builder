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

import { StepTitle } from "../step/StepTitle";
import { Line } from "../api/line/Line";

type Data = Line[];

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
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "text",
    title: "Text",
    sortable: false,
  },
  {
    name: "bullet",
    title: "Bullet",
    sortable: false,
  },
  {
    name: "level",
    title: "Level",
    sortable: false,
  },
  {
    name: "orderBy",
    title: "Order by",
    sortable: false,
  },
  {
    name: "step",
    title: "Step",
    sortable: false,
  },
];

export const LineList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/lines",
    async () => {
      const response = await api.get("/api/lines");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Lines"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/lines/new"}>
            <Button>Create Line </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Line) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/lines"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.text}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.bullet}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.level}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.orderBy}</>
                </DataGridCell>
                <DataGridCell>
                  <StepTitle id={item.step?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
