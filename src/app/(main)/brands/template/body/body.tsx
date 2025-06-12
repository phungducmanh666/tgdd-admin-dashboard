"use client";

import BrandApi from "@api-client/brand/BrandApi";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import { getMessageApi } from "@context/message/MessageContext";
import { BrandDto } from "@dto/brand/BrandDto";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateBrand from "./components/form/create/FormCreateBrand";
import BrandsDataTable, { BrandsTableRef } from "./components/table/BrandsDataTable";

const ApiClient = BrandApi;
interface Dto extends BrandDto {}

interface BrandsPageBodyProps {}

const BrandsPageBody: React.FC<BrandsPageBodyProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dataTableRef = useRef<BrandsTableRef>(null);

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
        <BrandsDataTable ref={dataTableRef} />
      </Flex>
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormCreateBrand onSubmit={handleCreate} />
      </Modal>
    </>
  );
};

export default BrandsPageBody;
