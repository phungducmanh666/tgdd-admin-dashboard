import VariantAttributeApi from "@api-client/variantAttribute/VariantAttributeApi";
import { VariantAttributeDto } from "@dto/variantAttribute/VariantAttributeDto";
import { Button, Flex, Input, InputRef } from "antd";
import Text from "antd/es/typography/Text";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

const ApiClient = VariantAttributeApi;
interface Dto extends VariantAttributeDto {}

interface FormCreateVariantAttributeProps {
  onSubmit: (name: string) => void;
}

const FormCreateVariantAttribute: React.FC<FormCreateVariantAttributeProps> = ({ onSubmit }: FormCreateVariantAttributeProps) => {
  const [checking, setChecking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputRef) inputRef.current?.focus();
  }, []);

  const checkNameExists = async (name: string) => {
    if (!checking) setChecking(true);
    const isNameExists = await ApiClient.IsNameExists(name);
    if (isNameExists) setError("Tên đã tồn tại!");
    else setError(null);
    setChecking(false);
  };

  const debounceCheckName = debounce(checkNameExists, 500, { leading: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    if (value.trim() === "") {
      setError("Tên không được để trống!");
      return;
    }
    debounceCheckName(value);
  };

  const handleSubmit = () => {
    if (checking) return;
    if (error) return;
    if (name === "") {
      setError("Tên không được để trống!");
      return;
    }
    onSubmit(name);
  };

  return (
    <Flex vertical gap={10}>
      <Text>Tên danh mục</Text>
      <Input ref={inputRef} onChange={handleChange} value={name} onPressEnter={handleSubmit} />
      {error && <Text type="danger">{error}</Text>}
      <Flex justify="end">
        <Button loading={checking} type="primary" onClick={handleSubmit} disabled={!!error}>
          Lưu
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormCreateVariantAttribute;
