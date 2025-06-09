"use client";

import { Button, ButtonProps } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface BackButtonProps extends ButtonProps {}
const BackButton: React.FC<BackButtonProps> = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Button icon={<FaArrowLeft />} shape="circle" type="primary" {...props} onClick={() => router.back()}>
      {children}
    </Button>
  );
};

export default BackButton;
