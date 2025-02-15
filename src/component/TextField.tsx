import React from "react";

type TextFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const TextField: React.FC<TextFieldProps> = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      type="text"
      className={`form-control ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextField;
