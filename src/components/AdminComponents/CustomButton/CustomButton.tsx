import React from 'react'

interface ButtonProps{
    label: string;
    textColor: string;
    btnColor: string;
    borderColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({label, textColor, btnColor, borderColor}) => {
  return (
    <button className={`bg-${btnColor} flex w-[8rem] h-10 py-[23px] px-4 justify-center items-center gap-2 rounded-xl border-1 border-solid border-${borderColor}`}>
        <span className={`text-sm text-${textColor} font-medium leading-[1.125rem]`}>{label}</span>
    </button>
  )
}

export default CustomButton