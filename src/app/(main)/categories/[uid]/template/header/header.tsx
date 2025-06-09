import BackButton from "@comp/button/back/BackButton";
import { Flex } from "antd";
import React from "react";

interface CategoryPageHeaderProps {}

const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({}) => {
  return (
    <Flex vertical gap={10}>
      <BackButton />
    </Flex>
  );
};

export default CategoryPageHeader;
