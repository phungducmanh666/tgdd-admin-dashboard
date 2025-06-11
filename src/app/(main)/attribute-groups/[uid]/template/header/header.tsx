import BackButton from "@comp/button/back/BackButton";
import { Flex } from "antd";
import React from "react";

interface AttributeGroupPageHeaderProps {}

const AttributeGroupPageHeader: React.FC<AttributeGroupPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <BackButton />
    </Flex>
  );
};

export default AttributeGroupPageHeader;
