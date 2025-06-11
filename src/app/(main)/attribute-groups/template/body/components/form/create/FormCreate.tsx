import AttributeGroupApi from "@api-client/attributeGroup/attributeGroup";
import CategoriesSelect from "@comp/select/category/CategoriesSelect";
import { Button, Flex, Input, InputRef } from "antd";
import Text from "antd/es/typography/Text";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

const ApiClient = AttributeGroupApi;

interface FormCreateAttributeGroupProps {
  onSubmit: (categoryUid: string, name: string) => void;
  categoryUid?: string;
  brandUid?: string;
}

const FormCreateAttributeGroup: React.FC<FormCreateAttributeGroupProps> = ({ onSubmit, categoryUid, brandUid }: FormCreateAttributeGroupProps) => {
  const [checking, setChecking] = useState<boolean>(false);
  const [selectError, setSelectError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [selectedUid, setSelectedUid] = useState<string | undefined>(undefined);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputRef) inputRef.current?.focus();
  }, []);

  const checkNameExists = async (name: string) => {
    if (!checking) setChecking(true);
    const isNameExists = await ApiClient.IsNameExists(name);
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
    onSubmit(selectedUid!, name);
  };

  const handleSelect = (categoryUid: string | undefined) => {
    setSelectedUid(categoryUid);
  };

  useEffect(() => {
    if (!!!selectedUid) {
      setSelectError("Lựa chọn không hợp lệ");
      return;
    }
    setSelectError(null);
  }, [selectedUid]);

  return (
    <Flex vertical gap={10}>
      <Text>Danh mục sản phẩm</Text>
      <CategoriesSelect onChange={handleSelect} defaultCategoryUid={categoryUid} />
      {selectError && <Text type="danger">{selectError}</Text>}
      <Text>Tên nhóm thuộc tính</Text>
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

export default FormCreateAttributeGroup;
