import useAttributes from "@api-client/attribute/hooks/useAttributes/useAttributes";
import { Select } from "antd";
import { DefaultOptionType } from "rc-select/lib/Select";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";

interface AttributeGroupsSelectProps {
  onChange: (uid: string | undefined) => void;
  selectStyles?: CSSProperties;
  defaultAttributeGroupUid?: string;
}

const cssStyle: CSSProperties = {
  minWidth: "200px",
  maxWidth: "100%",
};

const AttributeGroupsSelect: React.FC<AttributeGroupsSelectProps> = ({ onChange, selectStyles, defaultAttributeGroupUid }) => {
  const { loading, data, run, error } = useAttributes({});
  const [selectedUid, setSelectedUid] = useState<string | undefined>(defaultAttributeGroupUid);

  const options: DefaultOptionType[] = useMemo(() => {
    if (!data) return [];
    const attributeGroups = data.data;
    if (!!!selectedUid) {
      setSelectedUid(attributeGroups[0].uid);
    }
    return attributeGroups.map((item) => ({
      label: item.name,
      value: item.uid,
    }));
  }, [data]);

  const handleChange = (value: string | undefined) => {
    setSelectedUid(value);
  };

  useEffect(() => onChange(selectedUid), [selectedUid]);

  return (
    <Select
      title="AttributeGroups"
      style={selectStyles || cssStyle}
      options={options}
      loading={loading}
      value={selectedUid}
      onChange={handleChange}
    />
  );
};

export default AttributeGroupsSelect;
