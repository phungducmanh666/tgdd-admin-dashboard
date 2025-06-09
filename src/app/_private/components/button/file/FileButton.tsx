import { Button, ButtonProps } from "antd";
import React, { CSSProperties, useRef } from "react";
import { FaUpload } from "react-icons/fa6";

const inputStyle: CSSProperties = {
  display: "none",
};

interface FileButtonProps extends ButtonProps {
  onSelectFile: (file: File) => void;
}

const FileButton: React.FC<FileButtonProps> = ({ onSelectFile, children, ...props }: FileButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelectFile(file);
    }
    e.target.value = "";
  };

  return (
    <>
      <input type="file" ref={inputRef} style={inputStyle} onChange={handleChange} />
      <Button icon={<FaUpload />} type="default" {...props} onClick={handleClick}>
        {children}
      </Button>
    </>
  );
};

export default FileButton;
