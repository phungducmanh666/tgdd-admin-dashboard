import ProductLineApi from "@api-client/productLine/productLine";
import { Button, Flex, Input, InputRef } from "antd";
import Text from "antd/es/typography/Text";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import CategoriesBrandsSelect from "../../select/CategoriesBrandsSelect";

interface FormCreateProductLineProps {
  onSubmit: (categoryUid: string, brandUid: string, name: string) => void;
  categoryUid?: string;
  brandUid?: string;
}

type SelectedUidTypes = {
  categoryUid: string | undefined;
  brandUid: string | undefined;
};

const initialSelectedUid: SelectedUidTypes = {
  categoryUid: undefined,
  brandUid: undefined,
};

const FormCreateProductLine: React.FC<FormCreateProductLineProps> = ({ onSubmit, categoryUid, brandUid }: FormCreateProductLineProps) => {
  const [checking, setChecking] = useState<boolean>(false);
  const [selectError, setSelectError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [selectedUid, setSelectedUuid] = useState<SelectedUidTypes>(initialSelectedUid);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputRef) inputRef.current?.focus();
  }, []);

  const checkNameExists = async (name: string) => {
    if (!checking) setChecking(true);
    const isNameExists = await ProductLineApi.IsNameExists(name);
    if (isNameExists) setNameError("Tên đã tồn tại!");
    else setNameError(null);
    setChecking(false);
  };

  const debounceCheckName = debounce(checkNameExists, 500, { leading: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    if (value.trim() === "") {
      setNameError("Tên không được để trống!");
      return;
    }
    debounceCheckName(value);
  };

  const handleSubmit = () => {
    if (!!selectError) return;
    if (checking) return;
    if (nameError) return;
    if (name === "") {
      setNameError("Tên không được để trống!");
      return;
    }
    onSubmit(selectedUid.categoryUid!, selectedUid.brandUid!, name);
  };

  const handleSelect = (categoryUid: string | undefined, brandUid: string | undefined) => {
    setSelectedUuid({ categoryUid, brandUid });
  };

  useEffect(() => {
    if (!!!selectedUid.categoryUid || !!!selectedUid.brandUid) {
      setSelectError("Lựa chọn không hợp lệ");
      return;
    }
    setSelectError(null);
  }, [selectedUid]);

  return (
    <Flex vertical gap={10}>
      <Text>Danh mục sản phẩm</Text>
      <CategoriesBrandsSelect onChange={handleSelect} vertical={true} defaultCategoryUid={categoryUid} defaultBrandUid={brandUid} />
      {selectError && <Text type="danger">{selectError}</Text>}
      <Text>Tên dòng sản phẩm</Text>
      <Input ref={inputRef} onChange={handleChange} value={name} onPressEnter={handleSubmit} />
      {nameError && <Text type="danger">{nameError}</Text>}
      <Flex justify="end">
        <Button loading={checking} type="primary" onClick={handleSubmit} disabled={!!nameError || !!selectError}>
          Lưu
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormCreateProductLine;
