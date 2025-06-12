"use client";

import CategoryBrandMapApi from "@api-client/categoryBrandMap/CategoryBrandMapApi";
import useCategoryBrands from "@api-client/categoryBrandMap/hooks/useCategoryBrands";
import SmallImage from "@comp/image/small/SmallImage";
import { getMessageApi } from "@context/message/MessageContext";
import { BrandDto } from "@dto/brand/BrandDto";
import { initialTablePaginationState, tablePaginationReducer, TablePaginationState } from "@reducer/tablePagination/TablePaginationReducer";
import { Button, Col, Row, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useReducer, useState } from "react";

interface DataTransferProps {
  categoryUid: string;
}

export interface DataTransferRef {
  reload: () => void;
}

const urlPrefix: string = "brands";

const DataTransfer = forwardRef<DataTransferRef, DataTransferProps>(({ categoryUid }: DataTransferProps, ref) => {
  const [tablePaginationLeft, dispatchTablePaginationLeft] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [tablePaginationRight, dispatchTablePaginationRight] = useReducer(tablePaginationReducer, initialTablePaginationState);
  const [totalItemsLeft, setTotalItemsLeft] = useState<number>(0);
  const [totalItemsRight, setTotalItemsRight] = useState<number>(0);
  const brandsLeft = useCategoryBrands({ categoryUid, isBelong: true, paginationParams: { ...tablePaginationLeft } });
  const brandsRight = useCategoryBrands({ categoryUid, isBelong: false, paginationParams: { ...tablePaginationRight } });

  const reload = () => {
    dispatchTablePaginationLeft({ type: "RELOAD" });
    dispatchTablePaginationRight({ type: "RELOAD" });
  };

  useImperativeHandle(ref, () => ({
    reload: reload,
  }));

  const handleAdd = async (brandUid: string) => {
    const key = `createCategoryBrandMap${brandUid}`;
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang thêm...",
    });

    try {
      await CategoryBrandMapApi.Insert(categoryUid, brandUid);
      getMessageApi().open({
        key,
        type: "success",
        content: "Đã thêm",
        duration: 2,
      });
      reload();
    } catch (error) {
      const e = error as Error;
      getMessageApi().open({
        key,
        type: "error",
        content: e.message,
        duration: 2,
      });
    }
  };
  const handleDelete = async (brandUid: string) => {
    const key = `deleteCategoryBrandMap${brandUid}`;
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang xóa...",
    });

    try {
      await CategoryBrandMapApi.Delete(categoryUid, brandUid);
      getMessageApi().open({
        key,
        type: "success",
        content: "Đã xóa",
        duration: 2,
      });
      reload();
    } catch (error) {
      const e = error as Error;
      getMessageApi().open({
        key,
        type: "error",
        content: e.message,
        duration: 2,
      });
    }
  };

  const columnsLeft: TableColumnsType<BrandDto> = useMemo(
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
        title: "",
        render: ({ uid }: BrandDto) => (
          <Button type="primary" danger onClick={() => handleDelete(uid)}>
            Xóa
          </Button>
        ),
      },
    ],
    []
  );

  const columnsRight: TableColumnsType<BrandDto> = useMemo(
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
        title: "",
        render: ({ uid }: BrandDto) => (
          <Button type="primary" onClick={() => handleAdd(uid)}>
            Thêm
          </Button>
        ),
      },
    ],
    []
  );

  const handleChangeLeft = (pagination: TablePaginationConfig, filter: any, sorter: SorterResult<BrandDto> | SorterResult<BrandDto>[]) => {
    const payload: TablePaginationState = {
      currentPage: pagination.current!,
      itemsPerPage: pagination.pageSize!,
      orderField: tablePaginationLeft.orderField,
      orderDirection: tablePaginationLeft.orderDirection,
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
    dispatchTablePaginationLeft({ type: "CHANGE", payload });
  };

  const handleChangeRight = (pagination: TablePaginationConfig, filter: any, sorter: SorterResult<BrandDto> | SorterResult<BrandDto>[]) => {
    const payload: TablePaginationState = {
      currentPage: pagination.current!,
      itemsPerPage: pagination.pageSize!,
      orderField: tablePaginationLeft.orderField,
      orderDirection: tablePaginationLeft.orderDirection,
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
    dispatchTablePaginationRight({ type: "CHANGE", payload });
  };

  useEffect(() => {
    if (brandsLeft.data?.pagination.totalItems) {
      setTotalItemsLeft(brandsLeft.data.pagination.totalItems);
    }
  }, [brandsLeft.data]);

  useEffect(() => {
    brandsLeft.run();
  }, [tablePaginationLeft]);

  useEffect(() => {
    if (brandsRight.data?.pagination.totalItems) {
      setTotalItemsRight(brandsRight.data.pagination.totalItems);
    }
  }, [brandsRight.data]);

  useEffect(() => {
    brandsRight.run();
  }, [tablePaginationRight]);

  return (
    <Row gutter={[10, 10]}>
      <Col md={{ span: 12 }}>
        <Table
          loading={brandsLeft.loading}
          columns={columnsLeft}
          dataSource={brandsLeft.data?.data}
          rowKey={"uid"}
          onChange={handleChangeLeft}
          pagination={{
            current: tablePaginationLeft.currentPage,
            defaultPageSize: tablePaginationLeft.itemsPerPage,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            total: totalItemsLeft,
          }}
        />
      </Col>
      <Col md={{ span: 12 }}>
        <Table
          loading={brandsRight.loading}
          columns={columnsRight}
          dataSource={brandsRight.data?.data}
          rowKey={"uid"}
          onChange={handleChangeRight}
          pagination={{
            current: tablePaginationRight.currentPage,
            defaultPageSize: tablePaginationRight.itemsPerPage,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            total: totalItemsRight,
          }}
        />
      </Col>
    </Row>
  );
});

export default DataTransfer;
