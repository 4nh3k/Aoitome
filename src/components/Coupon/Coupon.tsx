import React from 'react'

const Coupon = () => {
  return (
    <div className='w-[400px] h-[164px]'>
      <div className='flex w-[150px] h-[150px] py-[37px] px-[29px] flex-col items-start gap-2 flex-shrink-0 rounded-l-lg border-1 border-solid border-blue-200 bg-blue-50 relative'>
        <span className='text-primary text-center text-4xl font-bold leading-9'>$9</span>
        <span className='text-sm font-normal leading-normal'> Details </span>
      </div>
    </div>
  )
}

export default Coupon