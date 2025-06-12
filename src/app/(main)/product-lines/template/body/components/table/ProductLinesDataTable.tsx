"use client";

import useProductLines from "@api-client/productLine/hooks/useProductLines/useProductLines";
import ProductLineApi from "@api-client/productLine/ProductLineApi";
import DeleteButton from "@comp/button/delete/DeleteButton";
import { getMessageApi } from "@context/message/MessageContext";
import { ProductLineDto } from "@dto/productLine/ProductLineDto";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "@reducer/tablePagination/TablePaginationReducer";
import { Flex, Popconfirm, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";

interface ProductLinesDataTableProps {
  categoryUid: string | undefined;
  brandUid: string | undefined;
}

export interface ProductLinesTableRef {
  reload: () => void;
}

type SelectedUidType = {
  categoryUid: string | undefined;
  brandUid: string | undefined;
};

const initialSelectedUid: SelectedUidType = {
  categoryUid: undefined,
  brandUid: undefined,
};

const urlPrefix: string = "product-lines";

const ProductLinesDataTable = forwardRef<ProductLinesTableRef, ProductLinesDataTableProps>(({ categoryUid, brandUid }, ref) => {
  const [tablePagination, dispatchTablePagination] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedUid, setSelectedUid] = useState<SelectedUidType>({
    categoryUid,
    brandUid,
  });
  const { loading, data, error, run } = useProductLines({
    categoryUid: selectedUid.categoryUid,
    brandUid: selectedUid.brandUid,
    findAllPagination: tablePagination,
  });

  useEffect(() => {
    setSelectedUid({ categoryUid, brandUid });
  }, [categoryUid, brandUid]);

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
        await ProductLineApi.DeleteByUid(uid);
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

  const columns: TableColumnsType<ProductLineDto> = useMemo(
    () => [
      {
        title: "uid",
        dataIndex: "uid",
      },
      {
        title: "name",
        dataIndex: "name",
        sorter: true,
        render: (_: unknown, { uid, name }: ProductLineDto) => <Link href={`/${urlPrefix}/${uid}`}>{name}</Link>,
      },
      {
        title: "create at",
        dataIndex: "createAt",
        sorter: true,
      },
      {
        title: "",
        render: ({ uid }: ProductLineDto) => (
          <Popconfirm title="xóa?" onConfirm={() => handleDelete(uid)}>
            <DeleteButton />
          </Popconfirm>
        ),
      },
    ],
    [handleDelete]
  );

  const handleChange = (pagination: TablePaginationConfig, filter: any, sorter: SorterResult<ProductLineDto> | SorterResult<ProductLineDto>[]) => {
    const payload: TablePaginationState = {
      currentPage: pagination.current!,
      itemsPerPage: pagination.pageSize!,
      orderField: tablePagination.orderField,
      orderDirection: tablePagination.orderDirection,
    };
    if (sorter) {
      sorter = sorter as SorterResult<ProductLineDto>;
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
  }, [tablePagination, selectedUid]);

  return (
    <Flex vertical gap={10}>
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
    </Flex>
  );
});

export default ProductLinesDataTable;
