"use client";

import ProductStatusApi from "@api-client/productStatus/ProductStatusApi";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import { getMessageApi } from "@context/message/MessageContext";
import { ProductStatusDto } from "@dto/productStatus/ProductStatusDto";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateProductStatus from "./components/form/create/FormCreateProductStatus";
import ProductStatusDataTable, { ProductStatusTableRef } from "./components/table/ProductStatusDataTable";

const ApiClient = ProductStatusApi;
interface Dto extends ProductStatusDto {}

interface BrandsPageBodyProps {}

const BrandsPageBody: React.FC<BrandsPageBodyProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dataTableRef = useRef<ProductStatusTableRef>(null);

  const handleCreate = async (name: string) => {
    setOpenModal(false);
    const key = "createBrand";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang tạo...",
    });

    try {
      await ApiClient.Insert(name);
      getMessageApi().open({
        key,
        type: "success",
        content: "Tạo thành công!",
        duration: 2,
      });
      dataTableRef.current?.reload();
    } catch (error) {
      getMessageApi().open({
        key,
        type: "error",
        content: "Tạo thất bại!",
        duration: 2,
      });
    }
  };

  const handleReload = () => {
    if (dataTableRef.current) {
      dataTableRef.current.reload();
    }
  };

  return (
    <>
      <Flex vertical gap={10}>
        <Flex gap={10}>
          <AddButton onClick={() => setOpenModal(true)} />
          <RefreshButton onClick={handleReload} />
        </Flex>
        <ProductStatusDataTable ref={dataTableRef} />
      </Flex>
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormCreateProductStatus onSubmit={handleCreate} />
      </Modal>
    </>
  );
};

export default BrandsPageBody;
