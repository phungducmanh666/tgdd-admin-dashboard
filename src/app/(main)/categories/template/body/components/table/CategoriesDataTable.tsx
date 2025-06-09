"use client";

import CategryApi from "@api-client/category/category";
import useCategories from "@api-client/category/hooks/useCategories/useCategories";
import DeleteButton from "@comp/button/delete/DeleteButton";
import SmallImage from "@comp/image/small/SmallImage";
import { getMessageApi } from "@context/message/MessageContext";
import { CategoryDto } from "@dto/category/category";
import { Popconfirm, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "./reducer/TablePaginationState";

interface CategoriesDataTableProps {}

export interface CategoriesDataTableRef {
  reload: () => void;
}

const CategoriesTable = forwardRef<CategoriesDataTableRef, CategoriesDataTableProps>((props, ref) => {
  const [tablePagination, dispatchTablePagination] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { loading, data, error, run } = useCategories(tablePagination);

  useImperativeHandle(ref, () => ({
    reload: run,
  }));

  const handleDelete = useCallback(
    async (uid: string) => {
      const key = `createCategory${uid}`;
      getMessageApi().open({
        key,
        type: "loading",
        content: "Đang xóa...",
      });

      try {
        await CategryApi.DeleteByUid(uid);
        getMessageApi().open({
          key,
          type: "success",
          content: "Đã xóa!",
          duration: 2,
        });
        run();
      } catch (error) {
        let e = error as Error;
        getMessageApi().open({
          key,
          type: "error",
          content: e.message,
          duration: 2,
        });
      }
    },
    [run]
  );

  const columns: TableColumnsType<CategoryDto> = useMemo(
    () => [
      {
        title: "uid",
        dataIndex: "uid",
      },
      {
        title: "name",
        dataIndex: "name",
        sorter: true,
        render: (_: unknown, { uid, name }: CategoryDto) => <Link href={`/categories/${uid}`}>{name}</Link>,
      },
      {
        title: "photo",
        dataIndex: "photoUrl",
        render: (photoUrl: string) => {
          return <SmallImage src={photoUrl} />;
        },
      },
      {
        title: "",
        render: ({ uid }: CategoryDto) => (
          <Popconfirm title="xóa?" onConfirm={() => handleDelete(uid)}>
            <DeleteButton />
          </Popconfirm>
        ),
      },
    ],
    [handleDelete]
  );

  const handleChange = (pagination: TablePaginationConfig, filter: any, sorter: SorterResult<CategoryDto> | SorterResult<CategoryDto>[]) => {
    const payload: TablePaginationState = {
      currentPage: pagination.current!,
      itemsPerPage: pagination.pageSize!,
      orderField: tablePagination.orderField,
      orderDirection: tablePagination.orderDirection,
    };
    if (sorter) {
      sorter = sorter as SorterResult<CategoryDto>;
      if (sorter.column) {
        payload.orderField = sorter.column.dataIndex as string;
      }
      if (sorter.order) {
        payload.orderDirection = sorter.order === "descend" ? "DESC" : "ASC";
      }
    }
    dispatchTablePagination({ type: "CHANGE", payload });
  };

  useEffect(() => {
    if (data?.pagination.totalItems) {
      setTotalItems(data.pagination.totalItems);
    }
  }, [data]);

  useEffect(() => {
    run();
  }, [tablePagination]);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data?.data}
      rowKey={"uid"}
      onChange={handleChange}
      pagination={{
        current: tablePagination.currentPage,
        defaultPageSize: tablePagination.itemsPerPage,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        total: totalItems,
      }}
    />
  );
});

export default CategoriesTable;
