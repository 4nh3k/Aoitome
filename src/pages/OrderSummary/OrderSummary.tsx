import { addressApi } from "@/apis/address.api";
import { orderingApi } from "@/apis/ordering.api";
import { paymentApi } from "@/apis/payment.api";
import OrderDetailsCard from "@/components/OrderDetailsCard";
import OrderPriceSummary from "@/components/OrderPriceSummary";
import OrderProduct from "@/components/Product/OrderProduct";
import { OrderItem } from "@/types/Models/Ordering/OrderModel/OrderItem.type";
import { addressToString, getAddressesFromList } from "@/utils/address";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface OrderSummaryProps {
  isDetail?: boolean;
}

export function OrderSummary(props: OrderSummaryProps) {
  const { id } = useParams();

  // Fetch order data
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await orderingApi.getOrderDetail(id);
      return res.data;
    },
  });

  // Fetch address data based on buyerId, but call useQuery unconditionally
  const { data: addressData, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["address", orderData?.buyerId],
    queryFn: async () => {
      const res = await addressApi.getAddressByBuyer(
        orderData?.buyerId,
        0,
        1000
      );
      return res.data;
    },
    enabled: !!orderData?.buyerId,
  });

  // Define checkout mutation outside of any conditionals
  const createCheckoutMutation = useMutation({
    mutationKey: ["createCheckout", orderData?.id],
    mutationFn: async () => {
      try {
        const orderItems: OrderItem[] = (orderData?.orderItems ?? []).map(
          (item) => ({
            bookId: item.bookId,
            title: item.title,
            unitPrice: item.unitPrice,
            oldUnitPrice: item.oldUnitPrice,
            totalUnitPrice: item.totalUnitPrice,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
          })
        );

        const data = await paymentApi.createCheckoutSession(orderItems);
        if (data.status === 200) {
          window.location.href = data.data;
        } else {
          toast.error("Failed to create checkout session: " + data);
        }
      } catch (error) {
        toast.error("Error creating checkout session: " + error);
      }
    },
  });

  if (isLoading || isLoadingAddress) return <div>Loading...</div>;

  // Get the address after data has loaded
  const address = getAddressesFromList(addressData?.data, orderData?.addressId);

  return (
    <>
      <div className="heading-4">
        {props.isDetail ? "Order Details" : "Order Summary"}
      </div>
      <div className="flex space-x-8 w-full">
        <OrderDetailsCard
          title="Delivery information"
          subTitle="Individual"
          isEditable={true}
          description={addressToString(address)}
        />
        <OrderDetailsCard
          title="Payment method"
          subTitle="Online with credit card"
        />
      </div>
      <div className="w-full mt-6 px-4 py-4 divide-y-1 bg-white flex flex-col justify-start items-start content-border">
        {orderData?.orderItems.map((item) => (
          <OrderProduct
            key={item.id}
            id={item.id}
            imageURL={item.imageUrl}
            title={item.title}
            price={item.unitPrice}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="mt-6 w-full">
        <OrderPriceSummary
          originalPrice={
            orderData?.orderItems.reduce(
              (acc, item) => acc + (item.unitPrice ?? 0),
              0
            ) || 0
          }
          savings={0}
          tax={0}
          storePickup={0}
          continuteShopping={false}
          textOnly={props.isDetail ?? false}
          onClick={() => {
            createCheckoutMutation.mutate();
          }}
        />
      </div>
    </>
  );
}
