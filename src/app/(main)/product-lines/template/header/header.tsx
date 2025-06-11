import { Breadcrumb, Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Title from "antd/es/typography/Title";
import React from "react";

interface ProductLinesPageHeaderProps { }

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    title: "Home",
  },
  {
    title: "Product lines",
  },
];

const ProductLinesPageHeader: React.FC<ProductLinesPageHeaderProps> = ({ }) => {
  return (
    <Flex vertical gap={10}>
      <Title>Quản lý dòng sản phẩm</Title>
      <Breadcrumb items={breadcrumbItems} />
    </Flex>
  );
};

export default ProductLinesPageHeader;
