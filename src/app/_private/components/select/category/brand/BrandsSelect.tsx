import useCategoryBrands from "@api-client/categoryBrandMap/hooks/useCategoryBrands";
import { Select } from "antd";
import { DefaultOptionType } from "rc-select/lib/Select";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";

interface BrandsSelectProps {
  categoryUid: string | undefined;
  onChange: (uid: string | undefined) => void;
  selectStyles?: CSSProperties;
  defaultBrandUid?: string;
}

const cssStyle: CSSProperties = {
  minWidth: "200px",
  maxWidth: "100%",
};

const BrandsSelect: React.FC<BrandsSelectProps> = ({ categoryUid, onChange, selectStyles, defaultBrandUid }) => {
  const { loading, data, run, error } = useCategoryBrands({ categoryUid: categoryUid || "", isBelong: true });
  const [selectedUid, setSelectedUid] = useState<string | undefined>(defaultBrandUid);

  const options: DefaultOptionType[] = useMemo(() => {
    if (!data) return [];
    const brands = data.data;
    if (!selectedUid) {
      setSelectedUid(brands[0]?.uid);
    }
    return brands.map((item) => ({
      label: item.name,
      value: item.uid,
    }));
  }, [data]);

  const handleChange = (value: string | undefined) => {
    setSelectedUid(value);
  };

  useEffect(() => onChange(selectedUid), [selectedUid]);

  useEffect(() => {
    run();
  }, [categoryUid]);

  return <Select title="brands" style={selectStyles || cssStyle} options={options} loading={loading} value={selectedUid} onChange={handleChange} />;
};

export default BrandsSelect;
