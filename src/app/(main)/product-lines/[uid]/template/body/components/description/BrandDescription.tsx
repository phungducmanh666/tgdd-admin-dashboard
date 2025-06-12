import SmallImage from "@comp/image/small/SmallImage";
import { CategoryDto } from "@dto/category/CategoryDto";
import { Descriptions, DescriptionsProps } from "antd";
import React from "react";

interface BrandDescriptionProps {
  category: CategoryDto;
}

const BrandDescription: React.FC<BrandDescriptionProps> = ({ category }: BrandDescriptionProps) => {
  const descriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Uid",
      children: <p>{category?.uid}</p>,
    },
    {
      key: "2",
      label: "Tên danh mục",
      children: <p>{category?.name}</p>,
    },
    {
      key: "3",
      label: "Ngày tạo",
      children: <p>{String(category?.createAt)}</p>,
    },
    {
      key: "4",
      label: "Hình ảnh",
      children: <SmallImage src={category?.photoUrl} />,
    },
  ];

  return <Descriptions items={descriptionItems} layout="vertical" column={1} />;
};

export default BrandDescription;
