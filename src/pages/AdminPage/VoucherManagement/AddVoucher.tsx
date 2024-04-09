import React from 'react'
import AdminInput from '../../../components/AdminComponents/Input/AdminInput'
import DatepickerInput from '../../../components/AdminComponents/Input/DatepickerInput'
import RadioButton from '../../../components/AdminComponents/RadioButton/RadioButton'
import GenresInput from '../../../components/AdminComponents/Input/GenresInput'
import CustomButton from '../../../components/AdminComponents/CustomButton/CustomButton'
import SearchInput from '../../../components/SearchInput'
import { DiscountInput } from '../../../components/AdminComponents/Input/DiscountInput'

interface VoucherTypeProps {
  voucherType: string
}

const AddVoucher: React.FC<VoucherTypeProps> = ({ voucherType }) => {

  const voucherTypeValues = [
    {
      label: 'Price discount',
      value: 'price'
    },
    {
      label: 'Delivery discount',
      value: 'delivery'
    }
  ]

  const visibilityTypeValues = [
    {
      label: 'Always visible',
      value: 'visible'
    },
    {
      label: 'Code entry only',
      value: 'code-entry'
    }
  ]

  return (
    <div className='bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm'>
      <div className="flex items-start basis-full gap-4 ">
        <div className="flex flex-col pt-4 pb-5 px-4 justify-between w-full gap-8 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <span className="heading-4">Voucher Management</span>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Title"} placeholder={"Enter voucher title"} />
            <AdminInput title={"Voucher code"} placeholder={"Enter voucher code"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <DatepickerInput title='Start date' />
            <DatepickerInput title='End date' />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <div className='flex-1 self-strech flex-grow'>
              <RadioButton label={'Voucher type'} name={'voucherType'} values={voucherTypeValues} />
            </div>
            <div className='flex-1 self-strech flex-grow'>
              <RadioButton label={'Visibility type'} name={'visibilityType'} values={visibilityTypeValues} />
            </div>
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <DiscountInput className={'flex flex-col items-strech w-full flex-wrap justify-between'} placeholder={'Enter discount'} dropdownList={['Fixed', 'Percentage']} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Maximum discount"} placeholder={"Enter maximum discount"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Minimum purchase amount"} placeholder={"Enter minimum purchase amount"} />
            <AdminInput title={"Maximum usage"} placeholder={"Enter maximum usage"} />
            <AdminInput title={"Usage limit per customer"} placeholder={"Enter usage limit"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Promotional description"} placeholder={"Enter promotional description"} />
          </div>

          <GenresInput />

          <div className="flex items-start justify-end gap-3 self-stretch w-full" >
            <CustomButton label={"Save changes"} textColor={"white"} btnColor={"primary"} />
            <CustomButton label={"Cancel"} textColor={"black"} btnColor={"white"} borderColor={"gray-300"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddVoucher 