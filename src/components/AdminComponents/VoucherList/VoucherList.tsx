import { Button, Datepicker } from 'flowbite-react'
import React from 'react'
import CustomTable from '../../CustomTable'
import SearchInput from '../../SearchInput'
import { DiscountInput } from '../Input/DiscountInput'

const VoucherList = () => {

  const headers = [
    {
      label: "Title",
      prop: "title",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Code",
      prop: "code",
      className: "text-gray-500 text-sm",
    },
    {
      label: "Discount amount",
      prop: "discount_amount",
      className: "text-gray-900 font-semibold text-sm",
    },
    {
      label: "Maximum usage",
      prop: "max_usage",
      className: "text-gray-900 font-semibold text-sm",
    },
    {
      label: "Used",
      prop: "used",
      className: "text-gray-900 font-semibold text-sm",
    },
    {
      label: "Validity period",
      prop: "validity_period",
      className: "text-gray-500 text-sm",
    },
    {
      label: "Status",
      prop: "status",
    },
    {
      label: "Action",
      prop: "action",
      className: "text-blue-700 text-xs font-medium hover:underline",
    },
  ];

  const dummyData = [
    {
      title: "Product A",
      code: "ABC123",
      discount_amount: 20,
      max_usage: 100,
      used: 50,
      validity_period: "30 days",
      status: "Active",
      action: "Edit"
    },
    {
      title: "Product B",
      code: "DEF456",
      discount_amount: 15,
      max_usage: 200,
      used: 150,
      validity_period: "60 days",
      status: "Expired",
      action: "Delete"
    },
    {
      title: "Product C",
      code: "GHI789",
      discount_amount: 30,
      max_usage: 150,
      used: 100,
      validity_period: "45 days",
      status: "Active",
      action: "View"
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between w-full">
        <div className="flex w-1/2 space-x-2 items-center">
          <DiscountInput className={'flex flex-col items-strech w-full flex-wrap justify-between'} placeholder={'Enter search input'} dropdownList={['Voucher title', 'Status']} />
        </div>
      </div>
      <CustomTable headers={headers} data={dummyData} />
    </div>
  )
}

export default VoucherList