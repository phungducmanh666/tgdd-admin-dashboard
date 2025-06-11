import { Flex } from "antd";
import React from "react";
import AttributeGroupsPageBody from "./template/body/body";
import AttributeGroupPageHeader from "./template/heder/header";

interface CategoryBrandsPageProps {
  params: Promise<{ uid: string }>;
}

const CategoryBrandsPage: React.FC<CategoryBrandsPageProps> = async ({ params }: CategoryBrandsPageProps) => {
  const { uid } = await params;
  return (
    <Flex vertical gap={10}>
      <AttributeGroupPageHeader />
      <AttributeGroupsPageBody />
    </Flex>
  );
};

export default CategoryBrandsPage;
