import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  icon: IconType;
  iconClassName?: string;
  text: string;
  textClassName?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  iconClassName,
  text,
  textClassName,
  onClick,
}) => {
  return (
    <button className="border-none text-sm flex space-x-1" onClick={onClick}>
      <Icon size={18} className={iconClassName} />
      <span className={textClassName}>{text}</span>
    </button>
  );
};

export default Button;
