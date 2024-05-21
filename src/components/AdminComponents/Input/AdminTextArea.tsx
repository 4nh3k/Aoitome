import React from 'react'

interface AdminTextAreaProps{
	name: string,
	value: any,
	title: string,
	placeholder: string
	onChange: (e) => void;
}

const AdminTextArea: React.FC<AdminTextAreaProps> = ({title, name, value, placeholder, onChange}) => {
	return (
		<div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<div className="flex py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none ">
				<textarea name={name} value={value} class="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 px-3 py-2" placeholder={placeholder} style={{outline: 0}} onChange={onChange}></textarea>
			</div>
		</div>
	)
}

export default AdminTextArea