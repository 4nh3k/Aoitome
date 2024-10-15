import React from 'react'

interface DataBoxProps{
    label: string,
    value: string
}

const AnalysisDataBox: React.FunctionComponent<DataBoxProps> = ({label, value}) => {
  return (
    <div className='flex flex-col flex-1 px-5 py-6 flex-start gap-2 rounded-xl bg-white shadow dark:bg-gray-600 p-4 md:p-6 content-border '>
        <div className='self-strech text-black heading-6'>{label}</div>
        <div className='self-strech text-black heading-3'>{value}</div>
    </div>
  )
}

export default AnalysisDataBox