"use client";

import useProductStatus from "@api-client/productStatus/hooks/useProductStatus/useProductStatus";
import ProductStatusApi from "@api-client/productStatus/ProductStatusApi";
import DeleteButton from "@comp/button/delete/DeleteButton";
import { getMessageApi } from "@context/message/MessageContext";
import { ProductStatusDto } from "@dto/productStatus/ProductStatusDto";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "@reducer/tablePagination/TablePaginationReducer";
import { Button, Flex, Popconfirm, Table, TableColumnsType, TablePaginationConfig, Tag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";

const ApiClient = ProductStatusApi;
interface Dto extends ProductStatusDto {}

interface ProductStatusDataTableProps {}

export interface ProductStatusTableRef {
  reload: () => void;
}

const urlPrefix: string = "product-status";

const ProductStatusDataTable = forwardRef<ProductStatusTableRef, ProductStatusDataTableProps>((props, ref) => {
  const [tablePagination, dispatchTablePagination] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { loading, data, error, run } = useProductStatus({ findAllPagination: tablePagination });

  useImperativeHandle(ref, () => ({
    reload: run,
  }));

  const handleDelete = useCallback(
    async (uid: string) => {
      const key = `deleteProductStatus${uid}`;
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

  const handleSetDefault = useCallback(
    async (uid: string) => {
      const key = `seDefault${uid}`;
      getMessageApi().open({
        key,
        type: "loading",
        content: "Đang lưu...",
      });

      try {
        await ApiClient.SetDefault(uid);
        getMessageApi().open({
          key,
          type: "success",
          content: "Đã lưu!",
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
        render: (_: unknown, { uid, name }: Dto) => <Link href={`/${urlPrefix}/${uid}`}>{name}</Link>,
      },
      {
        title: "",
        dataIndex: "isDefault",
        render: (_: unknown, { uid, name, isDefault }: Dto) => <p>{isDefault && <Tag>Mặc định</Tag>}</p>,
      },
      {
        title: "create at",
        dataIndex: "createAt",
        sorter: true,
      },
      {
        title: "",
        render: ({ uid, isDefault }: Dto) => (
          <Flex gap={10} align="center">
            <Popconfirm title="xóa?" onConfirm={() => handleDelete(uid)}>
              <DeleteButton />
            </Popconfirm>
            {!!!isDefault && (
              <Button size="small" type="primary" onClick={() => handleSetDefault(uid)}>
                Đặt làm mặc định
              </Button>
            )}
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

export default ProductStatusDataTable;
