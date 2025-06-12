import { Button, ButtonProps } from "antd";
import React from "react";
import { FaEdit } from "react-icons/fa";

interface EditButtonProps extends ButtonProps {}
const EditButton: React.FC<EditButtonProps> = ({ children, ...props }) => {
  return (
    <Button icon={<FaEdit />} type="default" shape="circle" {...props}>
      {children}
    </Button>
  );
};

export default EditButton;
