"use client";

import BrandApi from "@api-client/brand/BrandApi";
import useBrand from "@api-client/brand/hooks/useBrand/useBrand";
import CategryApi from "@api-client/category/CategoryApi";
import FileButton from "@comp/button/file/FileButton";
import LoadingPage from "@comp/loading/Loading";
import { getMessageApi } from "@context/message/MessageContext";
import { Button, Flex, Modal } from "antd";
import React, { useState } from "react";
import BrandDescription from "./components/description/BrandDescription";
import FormUpdateName from "./components/form/update/FormUpdateName";

interface BrandPageBodyProps {
  uid: string;
}

const BrandPageBody: React.FC<BrandPageBodyProps> = ({ uid }: BrandPageBodyProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, data, error, run } = useBrand(uid);

  if (loading) {
    return <LoadingPage />;
  }

  const handleUpdatePhoto = async (photo: File) => {
    const key = "updatePhoto";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang lưu...",
    });

    try {
      await BrandApi.UpdatePhoto(uid, photo);
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
        content: e?.message,
        duration: 2,
      });
    }
  };

  const handleUpdateName = async (name: string) => {
    setOpenModal(false);
    const key = "updatePhoto";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang lưu...",
    });

    try {
      await CategryApi.UpdateName(uid, name);
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
  };

  return (
    <>
      <Flex vertical gap={10}>
        <BrandDescription category={data!} />
        <Flex gap={10}>
          <Button onClick={() => setOpenModal(true)}>Sửa tên</Button>
          <FileButton onSelectFile={handleUpdatePhoto}>Tải hình ảnh</FileButton>
        </Flex>
      </Flex>{" "}
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormUpdateName onSubmit={handleUpdateName} />
      </Modal>
    </>
  );
};

export default BrandPageBody;
