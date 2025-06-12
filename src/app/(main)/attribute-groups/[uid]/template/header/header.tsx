"use client";

import useAttributeGroup from "@api-client/attributeGroup/hooks/useAttributeGroup/useAttributeGroup";
import BackButton from "@comp/button/back/BackButton";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface AttributeGroupPageHeaderProps {
  uid: string;
}

const AttributeGroupPageHeader: React.FC<AttributeGroupPageHeaderProps> = ({ uid }) => {
  const { loading, data, error, run } = useAttributeGroup(uid);

  return (
    <Flex vertical gap={10}>
      <BackButton />
      <Title>{data?.name}</Title>
    </Flex>
  );
};

export default AttributeGroupPageHeader;
