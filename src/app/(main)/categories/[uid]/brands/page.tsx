import { Flex } from "antd";
import React from "react";
import CategoryBrandsPageBody from "./template/body/body";
import CategoryBrandPageHeader from "./template/heder/header";

interface CategoryBrandsPageProps {
  params: Promise<{ uid: string }>;
}

const CategoryBrandsPage: React.FC<CategoryBrandsPageProps> = async ({ params }: CategoryBrandsPageProps) => {
  const { uid } = await params;
  return (
    <Flex vertical gap={10}>
      <CategoryBrandPageHeader />
      <CategoryBrandsPageBody categoryUid={uid} />
    </Flex>
  );
};

export default CategoryBrandsPage;
