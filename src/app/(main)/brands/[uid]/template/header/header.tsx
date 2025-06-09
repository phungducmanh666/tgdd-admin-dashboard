import BackButton from "@comp/button/back/BackButton";
import { Flex } from "antd";
import React from "react";

interface BrandPageHeaderProps {}

const BrandPageHeader: React.FC<BrandPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <BackButton />
    </Flex>
  );
};

export default BrandPageHeader;
