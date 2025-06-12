"use client";

import useVariantAttribute from "@api-client/variantAttribute/hooks/useVariantAttribute/useVariantAttribute";
import BackButton from "@comp/button/back/BackButton";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface VariantAttributePageHeaderProps {
  uid: string;
}

const VariantAttributePageHeader: React.FC<VariantAttributePageHeaderProps> = ({ uid }) => {
  const { loading, data, error, run } = useVariantAttribute(uid);

  return (
    <Flex vertical gap={10}>
      <BackButton />
      <Title>{data?.name}</Title>
    </Flex>
  );
};

export default VariantAttributePageHeader;
