import { Breadcrumb, Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Title from "antd/es/typography/Title";
import React from "react";

interface CategoriesPageHeaderProps {}

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    title: "Home",
  },
  {
    title: "Categories",
  },
];

const CategoriesPageHeader: React.FC<CategoriesPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <Title>Quản lý danh mục sản phẩm</Title>
      <Breadcrumb items={breadcrumbItems} />
    </Flex>
  );
};

export default CategoriesPageHeader;
