import { Button, Checkbox, Label } from "flowbite-react";
import { Link } from "react-router-dom";
import OrderDetailsCard from "@/components/OrderDetailsCard";
import OrderPriceSummary from "@/components/OrderPriceSummary";
import OrderProduct from "@/components/Product/OrderProduct";
import { path } from "@/constants/path";

export function OrderSummary() {
  return (
    <>
      <div className="heading-4">Order Summary</div>
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
      <div className="w-full mt-6 px-4 py-4 divide-y-1 bg-white flex flex-col justify-start items-start content-border">
        <OrderProduct id={0} imageURL={""} title={""} price={0} quantity={0} />
        <OrderProduct id={0} imageURL={""} title={""} price={0} quantity={0} />
        <OrderProduct id={0} imageURL={""} title={""} price={0} quantity={0} />
      </div>
      <div className="mt-6 w-full">
        <OrderPriceSummary textOnly={true} />
      </div>
      <div className="flex items-center gap-2 mt-6">
        <Checkbox id="accept" className="flex max-w-4" defaultChecked />
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
        <Button color="gray" className="active:scale-95 transition duration-150 ease-in-out">Return to shipping</Button>
        <Link to={path.customerOrder}>
          <Button className="active:scale-95 transition duration-150 ease-in-out">Send the order</Button>
        </Link>
      </div>
    </>
  );
}
