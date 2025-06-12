import { Breadcrumb, Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Title from "antd/es/typography/Title";
import React from "react";

interface ProductStatusPageHeaderProps {}

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    title: "Home",
  },
  {
    title: "Product status",
  },
];

const ProductStatusPageHeader: React.FC<ProductStatusPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <Title>Quản lý trạng thái mặt hàng</Title>
      <Breadcrumb items={breadcrumbItems} />
    </Flex>
  );
};

export default ProductStatusPageHeader;
