import { Flex } from "antd";
import Link from "next/link";
import React from "react";

interface CategoryPageFooterProps {
  uid: string;
}

const CategoryPageFooter: React.FC<CategoryPageFooterProps> = ({ uid }: CategoryPageFooterProps) => {
  return (
    <Flex vertical gap={10}>
      <Link href={`/categories/${uid}/brands`}>Brands</Link>
    </Flex>
  );
};

export default CategoryPageFooter;
