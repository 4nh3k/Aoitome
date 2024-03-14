import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  icon: IconType;
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, text, onClick }) => {
  return (
    <button
      className="border-none text-sm font-medium flex space-x-1"
      onClick={onClick}
    >
      <Icon size={18} className="button-icon" />
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Button;
