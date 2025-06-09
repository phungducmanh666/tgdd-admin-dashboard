import { Breadcrumb, Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Title from "antd/es/typography/Title";
import React from "react";

interface BrandsPageHeaderProps {}

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    title: "Home",
  },
  {
    title: "Brands",
  },
];

const BrandsPageHeader: React.FC<BrandsPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <Title>Quản lý thương hiệu</Title>
      <Breadcrumb items={breadcrumbItems} />
    </Flex>
  );
};

export default BrandsPageHeader;
