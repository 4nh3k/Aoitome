import React from 'react';
import CheckCircle from "@/assets/icon/check-circle.svg";
import XCircle from "@/assets/icon/x-circle.svg";

interface BooleanIconProps {
  isSuccess: boolean
}

const BooleanIcon:React.FC<BooleanIconProps> = (props) => {
  return (
    <>
      {props.isSuccess ? (
        <img src={CheckCircle} width={20} height={20} alt="Success" />
      ) : (
        <img src={XCircle} width={20} height={20} alt="Failure" />
      )}
    </>
  );
}

export default BooleanIcon