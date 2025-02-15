import React from "react";

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  className?: string;
};

const Checkbox: React.FC<CheckBoxProps> = ({ checked, onChange, className }) => {
  return (
    <input type="checkbox" checked={checked} onChange={onChange} className={`form-check-input ${className}`} />
  );
};

export default Checkbox;
