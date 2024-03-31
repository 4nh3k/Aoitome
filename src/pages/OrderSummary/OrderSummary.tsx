import { Button, Checkbox, Label } from "flowbite-react";
import OrderDetailsCard from "../../components/OrderDetailsCard";
import OrderPriceSummary from "../../components/OrderPriceSummary";
import OrderProduct from "../../components/Product/OrderProduct";

export function OrderSummary() {
  return (
    <>
      <div className="heading-4">Shopping Cart</div>
      <div className="flex space-x-8 w-full">
        <OrderDetailsCard
          title="Billing information"
          subTitle="Individual"
          isEditable={true}
          description="Bonnie Green - +1 234 567 890, San Francisco, California, United States, 3454, Scott Street"
        />
        <OrderDetailsCard
          title="Delivery information"
          subTitle="Individual"
          isEditable={true}
          description="Bonnie Green - +1 234 567 890, San Francisco, California, United States, 3454, Scott Street"
        />
        <OrderDetailsCard
          title="Payment method"
          subTitle="Online with credit card"
        />
      </div>
      <div className="w-full mt-6 px-5 py-5 divide-y-1 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
      </div>
      <div className="mt-6 w-full">
        <OrderPriceSummary textOnly={true} />
      </div>
      <div className="flex items-center gap-2 mt-6">
        <Checkbox id="accept" defaultChecked />
        <Label htmlFor="accept" className="flex">
          I agree with the&nbsp;
          <a
            href="#"
            className="text-cyan-600 hover:underline dark:text-cyan-500"
          >
            terms and conditions
          </a>
        </Label>
      </div>
      <div className="mt-6 flex space-x-5">
        <Button color="gray">Return to shipping</Button>
        <Button>Send the order</Button>
      </div>
    </>
  );
}
