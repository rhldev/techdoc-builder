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

import { GuideTitle } from "../guide/GuideTitle";
import { UserTitle } from "../user/UserTitle";
import { Approvals } from "../api/approvals/Approvals";

type Data = Approvals[];

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
    name: "changeData",
    title: "Change data",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "guide",
    title: "Guide",
    sortable: false,
  },
  {
    name: "originalData",
    title: "Original data",
    sortable: false,
  },
  {
    name: "owner",
    title: "Owner",
    sortable: false,
  },
  {
    name: "requestor",
    title: "Requestor",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const ApprovalsList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/approvals",
    async () => {
      const response = await api.get("/api/approvals");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Approvals"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/approvals/new"}>
            <Button>Create Approvals </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Approvals) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/approvals"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.changeData}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <GuideTitle id={item.guide?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.originalData}</>
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.owner?.id} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.requestor?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
