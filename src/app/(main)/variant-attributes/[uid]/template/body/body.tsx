"use client";

import VariantOptionApi from "@api-client/variantOption/VariantOptionApi";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import { getMessageApi } from "@context/message/MessageContext";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateVariantOption from "./components/form/create/FormCreateVariantOption";
import FormEditVariantOption from "./components/form/edit/FormEditVariantOption";
import VariantOptionsDataTable, { VariantAttributesTableRef } from "./components/table/VariantOptionsDataTable";

const ApiClient = VariantOptionApi;

interface VariantAttributesPageBodyProps {
  uid: string;
}

interface OpenModalProps {
  create?: boolean;
  edit?: boolean;
}

const initialOpenModalProps: OpenModalProps = {
  create: false,
  edit: false,
};

const VariantAttributesPageBody: React.FC<VariantAttributesPageBodyProps> = ({ uid }) => {
  const [openModal, setOpenModal] = useState<OpenModalProps>(initialOpenModalProps);
  const dataTableRef = useRef<VariantAttributesTableRef>(null);
  const attributeEditUid = useRef<string | undefined>(undefined);

  const handleCreate = async (name: string) => {
    setOpenModal({});
    const key = "createAttribute";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang tạo...",
    });

    try {
      await ApiClient.Insert(uid, name);
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

  const handleEdit = async (uid: string, name: string) => {
    setOpenModal({});
    const key = "editAttribute";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang lưu",
    });

    try {
      await ApiClient.UpdateName(uid, name);
      getMessageApi().open({
        key,
        type: "success",
        content: "Đã lưu!",
        duration: 2,
      });
      dataTableRef.current?.reload();
    } catch (error) {
      getMessageApi().open({
        key,
        type: "error",
        content: "Lưu thất bại!",
        duration: 2,
      });
    }
  };

  const handleReload = () => {
    if (dataTableRef.current) {
      dataTableRef.current.reload();
    }
  };

  const onCallEdit = (uid: string) => {
    attributeEditUid.current = uid;
    setOpenModal({ edit: true });
  };

  return (
    <>
      <Flex vertical gap={10}>
        <Flex gap={10}>
          <AddButton onClick={() => setOpenModal({ create: true })} />
          <RefreshButton onClick={handleReload} />
        </Flex>
        <VariantOptionsDataTable ref={dataTableRef} variantAttributeUid={uid} onEdit={onCallEdit} />
      </Flex>
      <Modal destroyOnHidden open={!!openModal.create} onCancel={() => setOpenModal({})} footer={null}>
        <FormCreateVariantOption onSubmit={handleCreate} />
      </Modal>
      <Modal destroyOnHidden open={!!openModal.edit} onCancel={() => setOpenModal({})} footer={null}>
        <FormEditVariantOption uid={attributeEditUid.current} onSubmit={handleEdit} />
      </Modal>
    </>
  );
};

export default VariantAttributesPageBody;
