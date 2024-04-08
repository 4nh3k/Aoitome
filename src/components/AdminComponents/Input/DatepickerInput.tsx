import { Datepicker, Select } from 'flowbite-react'
import React from 'react'

interface DatepickerProps{
    title: string,
}

const DatepickerInput: React.FC<DatepickerProps> = ({title}) => {
    return (
        <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<Datepicker className='self-strech w-full' />
		</div>
        
    )
}

export default DatepickerInput