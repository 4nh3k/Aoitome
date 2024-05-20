import React, { useState } from 'react'

interface AdminInputProps{
	title: string,
	name: string,
	value: any,
	placeholder: string,
	onChange: (value: string) => void;
}

const AdminInput: React.FC<AdminInputProps> = ({title, name, value, placeholder, onChange}) => {

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		onChange(inputValue);
	}

	return (
		<div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
				<input name={name} className="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none " value={value} placeholder={placeholder} onChange={handleInputChange}></input>
			</div>
		</div>
	)
}

export default AdminInput