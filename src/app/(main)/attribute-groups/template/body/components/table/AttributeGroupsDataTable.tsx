"use client";

import AttributeGroupApi from "@api-client/attributeGroup/attributeGroup";
import useAttributeGroups from "@api-client/attributeGroup/hooks/useAttributeGroups/useAttributeGroups";
import DeleteButton from "@comp/button/delete/DeleteButton";
import { getMessageApi } from "@context/message/MessageContext";
import { AttributeGroupDto } from "@dto/attributeGroup/attributeGroup";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "@reducer/tablePagination/TablePaginationReducer";
import { Flex, Popconfirm, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";

const ApiClient = AttributeGroupApi;
interface Dto extends AttributeGroupDto {}

interface AttributeGroupsDataTableProps {
  categoryUid: string | undefined;
}

export interface ProductLinesTableRef {
  reload: () => void;
}

const urlPrefix: string = "attribute-groups";

const AttributeGroupsDataTable = forwardRef<ProductLinesTableRef, AttributeGroupsDataTableProps>(({ categoryUid }, ref) => {
  const [tablePagination, dispatchTablePagination] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedUid, setSelectedUid] = useState<string | undefined>(categoryUid);
  const { loading, data, error, run } = useAttributeGroups({
    categoryUid: categoryUid,
    findAllPagination: tablePagination,
  });

  useEffect(() => {
    setSelectedUid(categoryUid);
  }, [categoryUid]);

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
        render: (_: unknown, { uid, name }: Dto) => <Link href={`/${urlPrefix}/${uid}`}>{name}</Link>,
      },
      {
        title: "create at",
        dataIndex: "createAt",
        sorter: true,
      },
      {
        title: "",
        render: ({ uid }: Dto) => (
          <Popconfirm title="xóa?" onConfirm={() => handleDelete(uid)}>
            <DeleteButton />
          </Popconfirm>
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

export default AttributeGroupsDataTable;
