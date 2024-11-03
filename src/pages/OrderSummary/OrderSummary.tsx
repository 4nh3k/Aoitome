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

export function OrderSummary() {
  const { id } = useParams();
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      var res = await orderingApi.getOrderDetail(id);
      return res.data;
    },
  });

  const { data: addressData, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["address", orderData?.buyerId],
    queryFn: async () => {
      if (!orderData?.buyerId) return null;
      var res = await addressApi.getAddressByBuyer(orderData.buyerId, 0, 1000);
      return res.data;
    },
    enabled: !!orderData?.buyerId,
  });

  if (isLoading || isLoadingAddress) return <div>Loading...</div>;
  const address = getAddressesFromList(addressData?.data, orderData?.addressId);
  const createCheckoutMutation = useMutation({
    mutationKey: ["createCheckout", orderData?.id],
    mutationFn: async () => {
      try {
        const orderItems: OrderItem[] = (orderData?.orderItems ?? [])
          .filter((item) => item)
          .map((item) => ({
            bookId: item.bookId,
            title: item.title,
            unitPrice: item.unitPrice,
            oldUnitPrice: item.oldUnitPrice,
            totalUnitPrice: item.totalUnitPrice,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
          }));

        const data = await paymentApi.createCheckoutSession(orderItems);
        if (data.status === 200) {
          const checkoutUrl = data.data; // Assuming the URL is returned in `checkoutUrl`
          window.location.href = checkoutUrl; // Redirect to the checkout page
        } else {
          // Handle non-200 status codes
          toast.error("Failed to create checkout session:" + data);
        }
      } catch (error) {
        // Handle errors from the API call
        toast.error("Error creating checkout session:" + error);
      }
    },
  });
  return (
    <>
      <div className="heading-4">Order Summary</div>
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
          onClick={() => {
            console.log(address);
            createCheckoutMutation.mutate();
            //handleCheckout();
          }}
        />{" "}
      </div>
    </>
  );
}
