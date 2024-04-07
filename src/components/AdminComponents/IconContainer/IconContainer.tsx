import React from 'react'

interface IconContainerProps{
    imgSrc: string
}

const IconContainer: React.FC<IconContainerProps> = ({imgSrc}) => {
  return (
    <div className='flex p-[0.5rem] justify-center'>
        <img className='w-8 h-8 flex-shrink-0' src={imgSrc} alt='icon'></img>
    </div>
  )
}

export default IconContainer