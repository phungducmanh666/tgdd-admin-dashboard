import { Button, ButtonProps } from 'antd';
import React from 'react';
import { FaPlus } from "react-icons/fa6";

interface AddButtonProps extends ButtonProps {
}
const AddButton: React.FC<AddButtonProps> = ({ children, ...props }) => {
  return <Button icon={<FaPlus />} shape='circle' type='primary' {...props} >{children}</Button>
};

export default AddButton;