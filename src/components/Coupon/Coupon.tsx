import React from 'react'

const Coupon = () => {
  return (
    <div className='w-full h-[160px] flex'>
      <div class='rounded-invert-right'>
        <span className='text-primary text-center text-4xl font-bold leading-9'>$9</span>
        <span className='text-sm text-center font-normal leading-normal'> Details </span>
      </div>
      <div class='rounded-invert-left'>
        <span className='heading-6'>Special deal</span>
        <span className='text-sm font-normal leading-5 text-gray-500'> For orders over $0.01 excluding freight </span>
        <span className='text-xs font-normal text-gray-500'>Valid until 2024/3/20</span>
      </div>
    </div>
  )
}

export default Coupon