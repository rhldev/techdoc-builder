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
import { UserTitle } from "../user/UserTitle";
import { DeviceTitle } from "../device/DeviceTitle";
import { Guide } from "../api/guide/Guide";

type Data = Guide[];

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
    name: "obsolete",
    title: "Obsolete",
    sortable: false,
  },
  {
    name: "title",
    title: "Title",
    sortable: false,
  },
  {
    name: "conclusion",
    title: "Conclusion",
    sortable: false,
  },
  {
    name: "publishedOn",
    title: "Published On",
    sortable: false,
  },
  {
    name: "introduction",
    title: "Introduction",
    sortable: false,
  },
  {
    name: "type",
    title: "Type",
    sortable: false,
  },
  {
    name: "category",
    title: "Category",
    sortable: false,
  },
  {
    name: "user",
    title: "User",
    sortable: false,
  },
  {
    name: "device",
    title: "Device",
    sortable: false,
  },
];

export const GuideList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/guides",
    async () => {
      const response = await api.get("/api/guides");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Guides"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/guides/new"}>
            <Button>Create Guide </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Guide) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/guides"}/${item.id}`}>
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
                  <>{item.obsolete}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.title}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.conclusion}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.publishedOn}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.introduction}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.type}</>
                </DataGridCell>
                <DataGridCell>
                  <CategoryTitle id={item.category?.id} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.user?.id} />
                </DataGridCell>
                <DataGridCell>
                  <DeviceTitle id={item.device?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
