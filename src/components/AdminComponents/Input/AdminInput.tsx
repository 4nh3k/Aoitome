import React from 'react'

interface AdminInputProps{
	title: string,
	placeholder: string
}

const AdminInput: React.FC<AdminInputProps> = ({title, placeholder}) => {
	return (
		<div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
				<input className="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none " placeholder={placeholder}></input>
			</div>
		</div>
	)
}

export default AdminInput