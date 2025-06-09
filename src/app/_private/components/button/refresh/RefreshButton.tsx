import { Button, ButtonProps } from 'antd';
import React from 'react';
import { FaRotateRight } from "react-icons/fa6";

interface RefreshButtonProps extends ButtonProps {
}
const RefreshButton: React.FC<RefreshButtonProps> = ({ children, ...props }) => {
  return <Button icon={<FaRotateRight />} shape='circle' type='primary' {...props} >{children}</Button>
};

export default RefreshButton;