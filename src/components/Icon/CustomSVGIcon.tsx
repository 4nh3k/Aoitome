import React from "react";

interface CustomIconProp {
  iconStyle: string;
  color: string;
  hoverColor?: string;
}

const CustomSVGIcon: React.FC<CustomIconProp> = (props) => {
  return (
    <div
      className={`bg-${props.color} w-5 h-5 ${props.iconStyle} svg-icon ${props.hoverColor !== undefined ? `hover:bg-${props.hoverColor} hover:text-${props.hoverColor} ` : ``}select-none cursor-pointer`}
    >
      oooooo
    </div>
  );
};

export default CustomSVGIcon;
