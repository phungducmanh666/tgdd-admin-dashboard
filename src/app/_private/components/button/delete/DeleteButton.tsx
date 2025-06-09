import { Button, ButtonProps } from "antd";
import React from "react";
import { FaTrash } from "react-icons/fa6";

interface DeleteButtonProps extends ButtonProps {}
const DeleteButton: React.FC<DeleteButtonProps> = ({ children, ...props }) => {
  return (
    <Button icon={<FaTrash color="red" />} type="default" shape="circle" color="danger" {...props}>
      {children}
    </Button>
  );
};

export default DeleteButton;
