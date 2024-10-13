import React, { useState } from "react";
import ChevronUp from '@/assets/icon/chevron-up-outline.svg'

interface PolicyProps {
  content: { label: string; content: string };
  iconSrc: string;
}

const Policy:React.FC<PolicyProps> = (props) => {
  return (
    <div className="flex flex-row justify-between text-sm">
      <div id="ship-policy-descr" className="flex items-center gap-2">
        <div className={`bg-primary text-primary w-5 h-5 ${props.iconSrc} svg-icon select-none cursor-auto`}>
          abcxyz
        </div>
        <strong>{props.content.label}</strong> {props.content.content}
      </div>
      <img className={`align-middle rotate-90 transition ease-in-out duration-700`} src={ChevronUp} width={16} height={16} ></img>
    </div>
  );
};

export default Policy;
