import SmallImage from "@comp/image/small/SmallImage";
import { CategoryDto } from "@dto/category/category";
import { Descriptions, DescriptionsProps } from "antd";
import React from "react";

interface CategoryDescriptionProps {
  category: CategoryDto;
}

const CategoryDescription: React.FC<CategoryDescriptionProps> = ({ category }: CategoryDescriptionProps) => {
  const descriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Uid",
      children: <p>{category?.uid}</p>,
    },
    {
      key: "1",
      label: "Tên danh mục",
      children: <p>{category?.name}</p>,
    },
    {
      key: "1",
      label: "Ngày tạo",
      children: <p>{String(category?.createAt)}</p>,
    },
    {
      key: "1",
      label: "Hình ảnh",
      children: <SmallImage src={category?.photoUrl} />,
    },
  ];

  return <Descriptions items={descriptionItems} layout="vertical" column={1} />;
};

export default CategoryDescription;
