"use client";

import BrandApi from "@api-client/brand/brand";
import useBrands from "@api-client/brand/hooks/useBrands/useBrands";
import DeleteButton from "@comp/button/delete/DeleteButton";
import SmallImage from "@comp/image/small/SmallImage";
import { getMessageApi } from "@context/message/MessageContext";
import { BrandDto } from "@dto/brand/brand";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "@reducer/tablePagination/TablePaginationReducer";
import { Popconfirm, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";

interface BrandsDataTableProps {}

export interface BrandsTableRef {
  reload: () => void;
}

const urlPrefix: string = "brands";

const BrandsDataTable = forwardRef<BrandsTableRef, BrandsDataTableProps>((props, ref) => {
  const [tablePagination, dispatchTablePagination] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { loading, data, error, run } = useBrands({ findAllPagination: tablePagination });

  useImperativeHandle(ref, () => ({
    reload: run,
  }));

  const handleDelete = useCallback(
    async (uid: string) => {
      const key = `deleteBrand${uid}`;
      getMessageApi().open({
        key,
        type: "loading",
        content: "Đang xóa...",
      });

      try {
        await BrandApi.DeleteByUid(uid);
        getMessageApi().open({
          key,
          type: "success",
          content: "Đã xóa!",
          duration: 2,
        });
        run();
      } catch (error) {
        const e = error as Error;
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

  const columns: TableColumnsType<BrandDto> = useMemo(
    () => [
      {
        title: "uid",
        dataIndex: "uid",
      },
      {
        title: "name",
        dataIndex: "name",
        sorter: true,
        render: (_: unknown, { uid, name }: BrandDto) => <Link href={`/${urlPrefix}/${uid}`}>{name}</Link>,
      },
      {
        title: "photo",
        dataIndex: "photoUrl",
        render: (photoUrl: string) => {
          return <SmallImage src={photoUrl} />;
        },
      },
      {
        title: "create at",
        dataIndex: "createAt",
        sorter: true,
      },
      {
        title: "",
        render: ({ uid }: BrandDto) => (
          <Popconfirm title="xóa?" onConfirm={() => handleDelete(uid)}>
            <DeleteButton />
          </Popconfirm>
        ),
      },
    ],
    [handleDelete]
  );

  const handleChange = (pagination: TablePaginationConfig, filter: any, sorter: SorterResult<BrandDto> | SorterResult<BrandDto>[]) => {
    const payload: TablePaginationState = {
      currentPage: pagination.current!,
      itemsPerPage: pagination.pageSize!,
      orderField: tablePagination.orderField,
      orderDirection: tablePagination.orderDirection,
    };
    if (sorter) {
      sorter = sorter as SorterResult<BrandDto>;
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

export default BrandsDataTable;
