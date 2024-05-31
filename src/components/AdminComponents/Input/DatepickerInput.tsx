import { Datepicker } from 'flowbite-react';
import React, { useState } from 'react';

interface DatepickerProps {
    title: string,
    value: Date,
    onChange: (date: Date | null) => void // Define a prop for handling date change
}

const DatepickerInput: React.FC<DatepickerProps> = ({ title, value, onChange }) => {
    // Handler for date change
    const handleDateChange = (date: Date) => {
        onChange(date); // Call the onChange prop with the selected date
        console.log(date);
    }

    return (
        <div className="flex flex-col items-start gap-2 flex-1 self-stretch flex-grow">
            <span className="text-sm font-medium leading-5">{title}</span>
            <Datepicker
                maxDate={new Date()}
                className='self-stretch w-full'
                value={value} // Pass the selected date as value
                onSelectedDateChanged={handleDateChange} // Handle date change
            />
        </div>
    );
}

export default DatepickerInput;
