import { Select } from 'flowbite-react'
import React from 'react'

interface AdminDropdownProps{
    title: string,
    items: string[]
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({title, items}) => {
    return (
        <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<Select className='self-strech w-full' required >
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