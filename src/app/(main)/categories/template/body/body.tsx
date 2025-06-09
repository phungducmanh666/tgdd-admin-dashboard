"use client";

import CategryApi from "@api-client/category/category";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import { getMessageApi } from "@context/message/MessageContext";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateCategory from "./components/form/create/FormCreateCategory";
import CategoriesTable, { CategoriesDataTableRef } from "./components/table/CategoriesDataTable";

interface CategoriesPageBodyProps {}

const CategoriesPageBody: React.FC<CategoriesPageBodyProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dataTableRef = useRef<CategoriesDataTableRef>(null);

  const handleCreate = async (name: string) => {
    setOpenModal(false);
    const key = "createCategory";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang tạo...",
    });

    try {
      await CategryApi.Insert(name);
      getMessageApi().open({
        key,
        type: "success",
        content: "Tạo danh mục thành công!",
        duration: 2,
      });
      dataTableRef.current?.reload();
    } catch (error) {
      getMessageApi().open({
        key,
        type: "error",
        content: "Tạo danh mục thất bại!",
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
        <CategoriesTable ref={dataTableRef} />
      </Flex>
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormCreateCategory onSubmit={handleCreate} />
      </Modal>
    </>
  );
};

export default CategoriesPageBody;
