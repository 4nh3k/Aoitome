import React from 'react'
import Discount from "@/assets/icon/discount.svg" 

const Coupon = () => {
  return (
    <div className='w-fit h-[45px] flex z-0'>
      <div className='rounded-invert-right'>
        <img src={Discount} className='w-[20px] h-[25px]'></img>
      </div>
      <div className='rounded-invert-left'>
        <span className='text-xs font-semibold'>Special deal</span>
      </div>
    </div>
  )
}

export default Coupon