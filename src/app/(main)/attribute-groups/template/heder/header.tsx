import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface AttributeGroupPageHeaderProps {}

const AttributeGroupPageHeader: React.FC<AttributeGroupPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <Title>Quản lý nhóm thuộc tính sản phẩm</Title>
    </Flex>
  );
};

export default AttributeGroupPageHeader;
