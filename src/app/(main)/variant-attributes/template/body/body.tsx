"use client";

import VariantAttributeApi from "@api-client/variantAttribute/VariantAttributeApi";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import { getMessageApi } from "@context/message/MessageContext";
import { VariantAttributeDto } from "@dto/variantAttribute/VariantAttributeDto";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateVariantAttribute from "./components/form/create/FormCreateVariantAttribute";
import VariantAttributesDataTable, { VariantAttributesTableRef } from "./components/table/VariantAttributesDataTable";

const ApiClient = VariantAttributeApi;
interface Dto extends VariantAttributeDto {}

interface VariantAttributesPageBodyProps {}

const VariantAttributesPageBody: React.FC<VariantAttributesPageBodyProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dataTableRef = useRef<VariantAttributesTableRef>(null);

  const handleCreate = async (name: string) => {
    setOpenModal(false);
    const key = "create";
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
        <VariantAttributesDataTable ref={dataTableRef} />
      </Flex>
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormCreateVariantAttribute onSubmit={handleCreate} />
      </Modal>
    </>
  );
};

export default VariantAttributesPageBody;
