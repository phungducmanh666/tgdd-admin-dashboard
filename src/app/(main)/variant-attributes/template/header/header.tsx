import { Breadcrumb, Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Title from "antd/es/typography/Title";
import React from "react";

interface VariantAttributesPageHeaderProps {}

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    title: "Home",
  },
  {
    title: "Variant attributes",
  },
];

const VariantAttributesPageHeader: React.FC<VariantAttributesPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <Title>Quản lý thuộc tính biến thể</Title>
      <Breadcrumb items={breadcrumbItems} />
    </Flex>
  );
};

export default VariantAttributesPageHeader;
