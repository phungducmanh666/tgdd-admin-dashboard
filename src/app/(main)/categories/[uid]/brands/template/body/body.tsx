"use client";

import RefreshButton from "@comp/button/refresh/RefreshButton";
import { Flex } from "antd";
import React, { useRef } from "react";
import CategoryBrandsDataTransfer, { DataTransferRef } from "./components/transfer/DataTransfer";

interface CategoryBrandsPageBodyProps {
  categoryUid: string;
}

const CategoryBrandsPageBody: React.FC<CategoryBrandsPageBodyProps> = ({ categoryUid }) => {
  const dataTransferRef = useRef<DataTransferRef>(null);

  const handleReload = () => {
    dataTransferRef?.current?.reload();
  };

  return (
    <Flex vertical gap={10}>
      <Flex gap={10}>
        <RefreshButton onClick={handleReload} />
      </Flex>
      <CategoryBrandsDataTransfer categoryUid={categoryUid} ref={dataTransferRef} />
    </Flex>
  );
};

export default CategoryBrandsPageBody;
