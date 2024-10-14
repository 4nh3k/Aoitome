import React from 'react'

interface ButtonProps{
    label: string;
    textColor: string;
    btnColor: string;
    borderColor?: string;
    imgSrc?: string;
    onClick: (event) => void;
}

const CustomButton: React.FC<ButtonProps> = ({label, textColor, btnColor, borderColor, imgSrc, onClick}) => {
  return (
    <button onClick={onClick} className={`bg-${btnColor} flex w-[8rem] h-10 py-[23px] px-4 justify-center items-center gap-3 rounded-xl border-1 border-solid border-${borderColor} active:scale-95 transition duration-150 ease-in-out`}>   
        {imgSrc ? (
          <img src={imgSrc} width={16} height={16}/>
        ) : ''}
        <span className={`text-sm text-${textColor} font-medium leading-[1.125rem]`}>{label}</span>
    </button>
  )
}

export default CustomButton