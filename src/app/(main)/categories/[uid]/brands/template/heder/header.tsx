import BackButton from "@comp/button/back/BackButton";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface CategoryBrandPageHeaderProps {}

const CategoryBrandPageHeader: React.FC<CategoryBrandPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <BackButton />
      <Title>Các thương hiệu trong danh mục</Title>
    </Flex>
  );
};

export default CategoryBrandPageHeader;
