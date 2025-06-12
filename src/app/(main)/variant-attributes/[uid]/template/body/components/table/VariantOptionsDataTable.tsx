"use client";

import useVariantOptions from "@api-client/variantOption/hooks/useVariantOptions/useVariantOptions";
import VariantOptionApi from "@api-client/variantOption/VariantOptionApi";
import DeleteButton from "@comp/button/delete/DeleteButton";
import EditButton from "@comp/button/edit/EditButton";
import { getMessageApi } from "@context/message/MessageContext";
import { VariantOptionDto } from "@dto/variantOption/VariantOptionDto";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "@reducer/tablePagination/TablePaginationReducer";
import { Flex, Popconfirm, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";

const ApiClient = VariantOptionApi;

interface Dto extends VariantOptionDto {}

interface VariantAttributesDataTableProps {
  variantAttributeUid: string;
  onEdit: (uid: string) => void;
}

export interface VariantAttributesTableRef {
  reload: () => void;
}

const VariantOptionsDataTable = forwardRef<VariantAttributesTableRef, VariantAttributesDataTableProps>(({ variantAttributeUid, onEdit }, ref) => {
  const [tablePagination, dispatchTablePagination] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { loading, data, error, run } = useVariantOptions({ variantAttributeUid, findAllPagination: tablePagination });

  useImperativeHandle(ref, () => ({
    reload: run,
  }));

  const handleDelete = useCallback(
    async (uid: string) => {
      const key = `deleteAttribute${uid}`;
      getMessageApi().open({
        key,
        type: "loading",
        content: "Đang xóa...",
      });

      try {
        await ApiClient.DeleteByUid(uid);
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

  const columns: TableColumnsType<Dto> = useMemo(
    () => [
      {
        title: "uid",
        dataIndex: "uid",
      },
      {
        title: "name",
        dataIndex: "name",
        sorter: true,
      },
      {
        title: "create at",
        dataIndex: "createAt",
        sorter: true,
      },
      {
        title: "",
        render: ({ uid }: Dto) => (
          <Flex gap={10} wrap>
            <Popconfirm title="xóa?" onConfirm={() => handleDelete(uid)}>
              <DeleteButton />
            </Popconfirm>
            <EditButton onClick={() => onEdit(uid)} />
          </Flex>
        ),
      },
    ],
    [handleDelete]
  );

  const handleChange = (pagination: TablePaginationConfig, filter: any, sorter: SorterResult<Dto> | SorterResult<Dto>[]) => {
    const payload: TablePaginationState = {
      currentPage: pagination.current!,
      itemsPerPage: pagination.pageSize!,
      orderField: tablePagination.orderField,
      orderDirection: tablePagination.orderDirection,
    };
    if (sorter) {
      sorter = sorter as SorterResult<Dto>;
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
    <>
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
    </>
  );
});

export default VariantOptionsDataTable;
