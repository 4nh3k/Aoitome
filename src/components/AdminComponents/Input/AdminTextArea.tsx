import React from 'react'

interface AdminTextAreaProps{
	title: string,
	placeholder: string
}

const AdminTextArea: React.FC<AdminTextAreaProps> = ({title, placeholder}) => {
	return (
		<div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
			<span className="text-sm font-medium leading-5">{title}</span>
			<div className="flex py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none ">
				<textarea className="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none border-none shadow-none appearance-none focus:outline-none focus:border-none border-transparent" placeholder={placeholder} style={{outline: 0}}></textarea>
			</div>
		</div>
	)
}

export default AdminTextArea