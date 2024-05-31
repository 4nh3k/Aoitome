import productCouponApi from "@/apis/productCoupon.api";
import CustomButton from "@/components/AdminComponents/CustomButton/CustomButton";
import AdminDropdown from "@/components/AdminComponents/Input/AdminDropdown";
import AdminInput from "@/components/AdminComponents/Input/AdminInput";
import DatepickerInput from "@/components/AdminComponents/Input/DatepickerInput";
import { CreateNewProductCoupon } from "@/types/Coupon/CreateNewProductCoupon.type";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddCouponModal = ({ onAddCoupon }) => {

  const [coupon, setCoupon] = useState<CreateNewProductCoupon>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Check if the value is a number and convert if necessary
    const parsedValue = isNaN(value) || value.trim() === '' ? value : parseFloat(value);
    setCoupon({ ...coupon, [name]: parsedValue })
    console.log(coupon);
  };

  const onValidFromDateChange = (date: Date) => {
    setCoupon({
      ...coupon,
      ['validFrom']: date
    })
  };

  const onValidToDateChange = (date: Date) => {
    setCoupon({
      ...coupon,
      ['validTo']: date
    })
  };

  const onDropdownChange = (e, key: any) => {
    const { name } = e.target;
    setCoupon({ ...coupon, [name]: key })
  }

  const createCouponMutation = useMutation({
    mutationKey: ['coupon', coupon],
    mutationFn: async (coupon: CreateNewProductCoupon) => {
      if (coupon === undefined || coupon === null) {
        return coupon;
      }

      if (coupon.discountUnit === undefined) {
        coupon.discountUnit = "PERCENTAGE"
      }

      console.log("Began creating coupon");

      const result = await productCouponApi.addProductCoupon(coupon);
      if (result.status !== 200) {
        toast.error(result.data.message);
      }
    },
    onSuccess: () => {
      toast.success("Create new coupon successfully");
      onAddCoupon(coupon);
      setCoupon(undefined);
    }
  });

  const handleCreateCoupon = (e) => {
    createCouponMutation.mutate(coupon);
  }

  return (
    <div className="flex flex-col pt-8 pb-8 px-6 justify-between items-start gap-10 rounded-2xl border-1 border-solid border-gray-300 bg-white w-full">
      <div className="flex w-full flex-wrap items-stretch justify-between gap-8">

        <AdminInput
          title={"Product id"}
          placeholder={"Enter product id"}
          onChange={onInputChange}
          type={"text"}
          name={"productId"}
          value={coupon?.productId}
        />

        <AdminInput
          title={"Name"}
          placeholder={"Enter name"}
          onChange={onInputChange}
          type={"text"}
          name={"name"}
          value={coupon?.name}
        />
      </div>

      <div className="flex w-full flex-wrap items-stretch justify-between gap-8">

        <AdminInput
          title={"Conditions"}
          placeholder={"Enter condition"}
          onChange={onInputChange}
          type={"text"}
          name={"conditions"}
          value={coupon?.conditions}
        />

        <AdminInput
          title={"Coupon code"}
          placeholder={"Enter coupon code"}
          onChange={onInputChange}
          type={"text"}
          name={"couponCode"}
          value={coupon?.couponCode}
        />
      </div>

      <div className="flex w-full flex-wrap items-stretch justify-between gap-8">

        <AdminDropdown title={"Choose discount unit"} name={"discountUnit"} items={["PERCENTAGE", "AMOUNT"].map(l => ({ key: l, value: l }))} value={coupon?.discountUnit} onChange={onDropdownChange} />

        <AdminInput
          title={"Discount value"}
          placeholder={"Enter discount value"}
          onChange={onInputChange}
          type={"number"}
          name={"discountValue"}
          value={coupon?.discountValue}
        />
      </div>

      <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
        <DatepickerInput
          name='validFrom'
          value={coupon?.validFrom !== undefined ? coupon?.validFrom.toLocaleDateString() : new Date().toLocaleDateString()}
          title="Valid from"
          onChange={onValidFromDateChange}
        />

        <DatepickerInput
          name='validTo'
          value={coupon?.validTo !== undefined ? coupon?.validTo.toLocaleDateString() : new Date().toLocaleDateString()}
          title="Valid to"
          onChange={onValidToDateChange}
        />
      </div>

      <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
        <AdminInput
          title={"Minimum order value"}
          placeholder={"Enter minimum order value"}
          onChange={onInputChange}
          type={"number"}
          name={"minimumOrderValue"}
          value={coupon?.minimumOrderValue}
        />

        <AdminInput
          title={"Maximum discount value"}
          placeholder={"Enter maximum discount value"}
          onChange={onInputChange}
          type={"text"}
          name={"maximumDiscountValue"}
          value={coupon?.maximumDiscountValue}
        />
      </div>
      <div className="flex w-full flex-wrap items-stretch self-stretch justify-end gap-8">
        <CustomButton
          onClick={handleCreateCoupon}
          label={"Save changes"}
          textColor={"white"}
          btnColor={"primary"}
        />
      </div>
    </div>
  )
}

export default AddCouponModal