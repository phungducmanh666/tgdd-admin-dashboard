import { Spin } from "antd";
import React, { CSSProperties } from "react";

interface LoadingPageProps {}

const containerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
  return (
    <div style={containerStyle}>
      <Spin />
    </div>
  );
};

export default LoadingPage;
