import useCategories from "@api-client/category/hooks/useCategories/useCategories";
import { Select } from "antd";
import { DefaultOptionType } from "rc-select/lib/Select";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";

interface CategoriesSelectProps {
  onChange: (uid: string | undefined) => void;
  selectStyles?: CSSProperties;
  defaultCategoryUid?: string;
}

const cssStyle: CSSProperties = {
  minWidth: "200px",
  maxWidth: "100%",
};

const CategoriesSelect: React.FC<CategoriesSelectProps> = ({ onChange, selectStyles, defaultCategoryUid }) => {
  const { loading, data, run, error } = useCategories({});
  const [selectedUid, setSelectedUid] = useState<string | undefined>(defaultCategoryUid);

  const options: DefaultOptionType[] = useMemo(() => {
    if (!data) return [];
    const categories = data.data;
    if (!!!selectedUid) {
      setSelectedUid(categories[0].uid);
    }
    return categories.map((item) => ({
      label: item.name,
      value: item.uid,
    }));
  }, [data]);

  const handleChange = (value: string | undefined) => {
    setSelectedUid(value);
  };

  useEffect(() => onChange(selectedUid), [selectedUid]);

  return (
    <Select title="Categories" style={selectStyles || cssStyle} options={options} loading={loading} value={selectedUid} onChange={handleChange} />
  );
};

export default CategoriesSelect;
