import { Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

interface AdminDropdownProps{
    title: string,
    items: string[],
    onChange: (value: string) => void;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({title, items, onChange}) => {

    const [selectedValue, setSelectedValue] = useState<string>(items[length - 1]);

    const handleChange =(e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onChange(value);
        setSelectedValue(value);
    }

    return (
        <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<Select className='self-strech w-full' required value={selectedValue} onChange={handleChange}>
            {items.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </Select>
		</div>
        
    )
}

export default AdminDropdown