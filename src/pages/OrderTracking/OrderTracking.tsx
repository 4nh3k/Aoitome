import { Progress } from "flowbite-react";
import { TrackingList } from "../../assets/mockdata";
import OrderProduct from "../../components/Product/OrderProduct";
import TrackingTimeline from "../../components/TrackingTimeline";
import CustomButton from "../../components/AdminComponents/CustomButton/CustomButton";

export function OrderTracking() {
  return (
    <>
      <span className="heading-5">
        Tracking the delivery of order #123456789{" "}
      </span>
      <div className="flex justify-between items-start mt-4">
        {TrackingList.map((item, index) => (
          <TrackingTimeline key={index} {...item} />
        ))}
      </div>
      <Progress progress={75} progressLabelPosition="outside" labelProgress />
      <div className="flex">
        <div className="w-full mr-20 mt-6 px-5 py-5 divide-y-1">
          <OrderProduct />
          <OrderProduct />
          <OrderProduct />
        </div>
        <div className="w-3/5 mt-6">
          <span className="heading-5">Order information</span>
          <div className="divide-y-1 mt-4">
            <div className="flex justify-between items-center py-4">
              <span className="font-bold">Order date</span>
              <span>24 November 2023</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="font-bold">Email</span>
              <span>name@example.com</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="font-bold">Phone</span>
              <span>+123 456 789</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="font-bold">Payment method</span>
              <span>Mastercard credit card</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="font-bold">Shipping address</span>
              <span>6 Miles Drive St, Califorinia</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="heading-6">Total</span>
              <span className="heading-6">$5000</span>
            </div>
            
          </div>
          <div className="flex mt-5 items-strech justify-center gap-10 self-stretch w-full" >
            <CustomButton label={"Cancel order"} textColor={"white"} btnColor={"secondary"} />
            <CustomButton label={"Order details"} textColor={"white"} btnColor={"primary"} borderColor={"primary"} />
          </div>
        </div>
      </div>
    </>
  );
}
