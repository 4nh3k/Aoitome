import { Label, Radio } from "flowbite-react";
import DeliveryAddressForm from "../../components/DeliveryAddressFrom";
import OrderSummary from "../../components/OrderSummary";
import CartProduct from "../../components/Product/CartProduct";

export function Checkout() {
  return (
    <>
      <div className="heading-4">Shopping Cart</div>
      <div className="flex w-full space-x-10 mt-4">
        <div className="w-full">
          <DeliveryAddressForm />
          <div className="w-full mt-6 px-5 py-5 space-y-2 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="heading-5">Delivery Type</span>
            <fieldset className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="united-state"
                  name="countries"
                  value="USA"
                  defaultChecked
                />
                <Label htmlFor="united-state">Fast delivery</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="germany" name="countries" value="Germany" />
                <Label htmlFor="germany">Standard delivery</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="germany" name="countries" value="Germany" />
                <Label htmlFor="germany">Store pickup</Label>
              </div>
            </fieldset>
          </div>
          <div className="w-full mt-6 px-5 py-5 space-y-2 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="heading-5">Payment details</span>
            <fieldset className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="united-state"
                  name="countries"
                  value="USA"
                  defaultChecked
                />
                <Label htmlFor="united-state">Online banking</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="germany" name="countries" value="Germany" />
                <Label htmlFor="germany">COD</Label>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full space-y-2 mb-6">
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
          </div>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
