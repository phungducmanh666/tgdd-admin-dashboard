import VariantOptionApi from "@api-client/variantOption/VariantOptionApi";
import { Button, Flex, Input, InputRef } from "antd";
import Text from "antd/es/typography/Text";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

const ApiClient = VariantOptionApi;

interface FormEditVariantOptionProps {
  uid?: string;
  onSubmit: (uid: string, name: string) => void;
}

const FormEditVariantOption: React.FC<FormEditVariantOptionProps> = ({ uid, onSubmit }: FormEditVariantOptionProps) => {
  const [checking, setChecking] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

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
    if (checking) return;
    if (nameError) return;
    if (name === "") {
      setNameError("Tên không được để trống!");
      return;
    }
    onSubmit(uid!, name);
  };

  return (
    <Flex vertical gap={10}>
      <Text>Tên thuộc tính</Text>
      <Input ref={inputRef} onChange={handleChange} value={name} onPressEnter={handleSubmit} />
      {nameError && <Text type="danger">{nameError}</Text>}
      <Flex justify="end">
        <Button loading={checking} type="primary" onClick={handleSubmit} disabled={!!nameError}>
          Lưu
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormEditVariantOption;
