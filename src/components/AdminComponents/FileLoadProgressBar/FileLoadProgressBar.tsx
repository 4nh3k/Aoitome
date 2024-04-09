import React from 'react'
import { Progress } from "flowbite-react";
import CheckSuccess from "../../../assets/icon/check-success.svg"

const FileLoadProgressBar = () => {
  return (
    <div className='flex p-4 justify-between items-start gap-2 self-stretch bg-[#FAFAFA] rounded-lg'>
      <div className='flex self-strech gap-3 items-center align-middle'>
        <img className='w-12 h-12 bg-gray-50 rounded-lg border-none outline-none' />
        <div className='flex flex-col items-center gap-4 self-strech w-9/10'>
          <span className='text-sm font-semibold self-stretch'>Product thumbnail.png</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>
      <div className='flex py-[10px] justify-center items-center gap-[10px]'>
        <img src={CheckSuccess} width={32} height={32} />
      </div>
    </div>
  )
}

export default FileLoadProgressBar