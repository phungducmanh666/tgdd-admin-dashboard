"use client";

import AttributeGroupApi from "@api-client/attributeGroup/AttributeGroupApi";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import CategoriesSelect from "@comp/select/category/CategoriesSelect";
import { getMessageApi } from "@context/message/MessageContext";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateAttributeGroup from "./components/form/create/FormCreate";
import AttributeGroupsDataTable, { ProductLinesTableRef } from "./components/table/AttributeGroupsDataTable";

const ApiClient = AttributeGroupApi;

interface AttributeGroupsPageBodyProps {
  ""?: "";
}

const AttributeGroupsPageBody: React.FC<AttributeGroupsPageBodyProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUid, setSelectedUid] = useState<string | undefined>(undefined);
  const dataTableRef = useRef<ProductLinesTableRef>(null);

  const handleCreate = async (categoryUid: string, name: string) => {
    setOpenModal(false);
    const key = "createProductLine";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang tạo...",
    });

    try {
      await ApiClient.Insert(categoryUid, name);
      getMessageApi().open({
        key,
        type: "success",
        content: "Đã xong!",
        duration: 2,
      });
      dataTableRef.current?.reload();
    } catch (error) {
      const e = error as Error;
      getMessageApi().open({
        key,
        type: "error",
        content: e?.message,
        duration: 2,
      });
    }
  };

  const handleReload = () => {
    if (dataTableRef.current) {
      dataTableRef.current.reload();
    }
  };

  const handleSelect = (categoryUid: string | undefined) => {
    setSelectedUid(categoryUid);
  };

  return (
    <>
      <Flex vertical gap={10}>
        <Flex gap={10} wrap>
          <CategoriesSelect onChange={handleSelect} />
        </Flex>
        <Flex gap={10}>
          <AddButton onClick={() => setOpenModal(true)} />
          <RefreshButton onClick={handleReload} />
        </Flex>
        <AttributeGroupsDataTable ref={dataTableRef} categoryUid={selectedUid} />
      </Flex>
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormCreateAttributeGroup onSubmit={handleCreate} categoryUid={selectedUid} />
      </Modal>
    </>
  );
};

export default AttributeGroupsPageBody;
