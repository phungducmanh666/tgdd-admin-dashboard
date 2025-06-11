import BrandsSelect from "@comp/select/category/brand/BrandsSelect";
import CategoriesSelect from "@comp/select/category/CategoriesSelect";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";

interface CategoriesBrandsSelectProps {
  onChange: (categoryUid: string | undefined, brandUid: string | undefined) => void;
  vertical?: boolean;
  defaultCategoryUid?: string;
  defaultBrandUid?: string;
}

const CategoriesBrandsSelect: React.FC<CategoriesBrandsSelectProps> = ({ onChange, vertical, defaultCategoryUid, defaultBrandUid }) => {
  const [selectedCategoryUid, setSelectedCategoryUid] = useState<string | undefined>();
  const [selectedBrandUid, setSelectedBrandUid] = useState<string | undefined>();

  const handleChangeCategory = (uid: string | undefined) => {
    setSelectedCategoryUid(uid);
  };

  const handleChangeBrand = (uid: string | undefined) => {
    setSelectedBrandUid(uid);
  };

  useEffect(() => onChange(selectedCategoryUid, selectedBrandUid), [selectedCategoryUid, selectedBrandUid]);

  const selectStyles =
    vertical === true
      ? {
          width: "100%",
        }
      : undefined;

  return (
    <Flex gap={10} wrap vertical={vertical || false}>
      <CategoriesSelect onChange={handleChangeCategory} selectStyles={selectStyles} defaultCategoryUid={defaultCategoryUid} />
      <BrandsSelect categoryUid={selectedCategoryUid} onChange={handleChangeBrand} selectStyles={selectStyles} defaultBrandUid={defaultBrandUid} />
    </Flex>
  );
};

export default CategoriesBrandsSelect;
