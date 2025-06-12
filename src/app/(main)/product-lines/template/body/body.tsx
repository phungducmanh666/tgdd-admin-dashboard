"use client";

import ProductLineApi from "@api-client/productLine/ProductLineApi";
import AddButton from "@comp/button/add/AddButton";
import RefreshButton from "@comp/button/refresh/RefreshButton";
import { getMessageApi } from "@context/message/MessageContext";
import { Flex, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormCreateProductLine from "./components/form/create/FormCreateProductLine";
import CategoriesBrandsSelect from "./components/select/CategoriesBrandsSelect";
import ProductLinesDataTable, { ProductLinesTableRef } from "./components/table/ProductLinesDataTable";

interface ProductLinesPageBodyProps {}

type SelectedUidType = {
  categoryUid: string | undefined;
  brandUid: string | undefined;
};

const initialSelectedUid: SelectedUidType = {
  categoryUid: undefined,
  brandUid: undefined,
};

const ProductLinesPageBody: React.FC<ProductLinesPageBodyProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUid, setSelectedUid] = useState<SelectedUidType>(initialSelectedUid);
  const dataTableRef = useRef<ProductLinesTableRef>(null);

  const handleCreate = async (categoryUid: string, brandUid: string, name: string) => {
    setOpenModal(false);
    const key = "createProductLine";
    getMessageApi().open({
      key,
      type: "loading",
      content: "Đang tạo...",
    });

    try {
      await ProductLineApi.Insert(categoryUid, brandUid, name);
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

  const handleSelect = (categoryUid: string | undefined, brandUid: string | undefined) => {
    setSelectedUid({ categoryUid, brandUid });
  };

  return (
    <>
      <Flex vertical gap={10}>
        <Flex gap={10} wrap>
          <CategoriesBrandsSelect onChange={handleSelect} />
        </Flex>
        <Flex gap={10}>
          <AddButton onClick={() => setOpenModal(true)} />
          <RefreshButton onClick={handleReload} />
        </Flex>
        <ProductLinesDataTable ref={dataTableRef} {...selectedUid} />
      </Flex>
      <Modal destroyOnHidden open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        <FormCreateProductLine onSubmit={handleCreate} {...selectedUid} />
      </Modal>
    </>
  );
};

export default ProductLinesPageBody;
