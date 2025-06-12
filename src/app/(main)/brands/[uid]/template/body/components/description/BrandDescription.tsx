import SmallImage from "@comp/image/small/SmallImage";
import { BrandDto } from "@dto/brand/BrandDto";
import { Descriptions, DescriptionsProps } from "antd";
import React from "react";

interface Dto extends BrandDto {}

interface BrandDescriptionProps {
  item: Dto;
}

const BrandDescription: React.FC<BrandDescriptionProps> = ({ item }: BrandDescriptionProps) => {
  const descriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Uid",
      children: <p>{item?.uid}</p>,
    },
    {
      key: "2",
      label: "Tên danh mục",
      children: <p>{item?.name}</p>,
    },
    {
      key: "3",
      label: "Ngày tạo",
      children: <p>{String(item?.createAt)}</p>,
    },
    {
      key: "4",
      label: "Hình ảnh",
      children: <SmallImage src={item?.photoUrl} />,
    },
  ];

  return <Descriptions items={descriptionItems} layout="vertical" column={1} />;
};

export default BrandDescription;
