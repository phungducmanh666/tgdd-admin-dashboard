"use client";

import CategryApi from "@api-client/category/CategoryApi";
import useCategory from "@api-client/category/hooks/useCategory/useCategory";
import FileButton from "@comp/button/file/FileButton";
import LoadingPage from "@comp/loading/Loading";
import { getMessageApi } from "@context/message/MessageContext";
import { Button, Flex, Modal } from "antd";
import React, { useState } from "react";
import CategoryDescription from "./components/description/CategoryDescription";
import FormUpdateName from "./components/form/update/FormUpdateName";

interface CategoryPageBodyProps {
  uid: string;
}

const CategoryPageBody: React.FC<CategoryPageBodyProps> = ({ uid }: CategoryPageBodyProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, data, error, run } = useCategory(uid);

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
      await CategryApi.UpdatePhoto(uid, photo);
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
        <CategoryDescription category={data!} />
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

export default CategoryPageBody;
