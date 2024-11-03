import { cartApi } from "@/apis/cart.api";
import { orderingApi } from "@/apis/ordering.api";
import { paymentApi } from "@/apis/payment.api";
import DeliveryAddressForm from "@/components/DeliveryAddressFrom";
import OrderPriceSummary from "@/components/OrderPriceSummary";
import CartProduct from "@/components/Product/CartProduct/CartProduct";
import { AddressDTO } from "@/types/DTOs/Ordering/AddressDTO.type";
import { CreateOrderDTO } from "@/types/DTOs/Ordering/CreateOrderDTO.type";
import { CardType } from "@/types/Models/Ordering/BuyerModel/CardType.type";
import { OrderItem } from "@/types/Models/Ordering/OrderModel/OrderItem.type";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label, Radio } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

export function Checkout() {
  const userId = getUIDFromLS();
  const [address, setAddress] = useState<AddressDTO>({
    street: "ab ",
    city: "HCM",
    state: "ab",
    zipCode: "ab",
    country: "United States",
  } as AddressDTO);
  const navigate = useNavigate();

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      console.log("userId", userId);
      const data = await cartApi.getCart(userId ?? "N/A");
      console.log("data", data);
      return data.data;
    },
  });
  const [cardType, setCardType] = useState<CardType>({
    id: 0,
    name: "",
  });
  const { data: paymentMethodsData, isLoading: isPaymentLoading } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: async () => {
      const data = await orderingApi.getCardTypes();
      return data.data;
    },
  });

  const createCheckoutMutation = useMutation({
    mutationKey: ["createCheckout", userId],
    mutationFn: async () => {
      try {
        if (!cartData) {
          toast.error("Cart is empty");
          return;
        }
        const orderItems: OrderItem[] = cartData.items
          .filter((item) => item.selected)
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
  const createOrderMutation = useMutation({
    mutationKey: ["createOrder", userId],
    mutationFn: async () => {
      console.log("createOrderMutation");
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }
      if (userId === undefined || userId === null) {
        toast.error("Please login to checkout");
        return;
      }
      if (cartData.items.length === 0) {
        toast.error("Cart is empty");
        return;
      }
      const orderItems: OrderItem[] = cartData.items
        .filter((item) => item.selected)
        .map((item) => ({
          bookId: item.bookId,
          title: item.title,
          unitPrice: item.unitPrice,
          oldUnitPrice: item.oldUnitPrice,
          totalUnitPrice: item.totalUnitPrice,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
        }));
      const order: CreateOrderDTO = {
        userId: userId,
        orderItems: orderItems,
        address: address,
        paymentMethod: {
          alias: cardType.name,
          cardNumber: "string",
          securityNumber: "string",
          cardHoldername: "string",
          expiration: formatDate(new Date()),
          cardTypeId: 1,
          buyerId: userId,
        },
        userName: "",
        description: "",
      };
      console.log("order", order);
      var data = await orderingApi.createOrdering(order);
      if (data.status === 200) {
        const orderId = data.data.id;
        navigate(`/order-summary/${orderId}`);
        //createCheckoutMutation.mutate();
      }
    },
  });

  if (isPaymentLoading) {
    return <div>Loading...</div>;
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCardType = paymentMethodsData?.find(
      (method) => method.id === parseInt(e.target.value)
    );
    if (selectedCardType) {
      setCardType(selectedCardType);
    }
  };
  const handleCheckout = () => {
    createOrderMutation.mutate();
  };

  return (
    <>
      <div className="heading-4">Checkout</div>
      <div className="flex w-full space-x-10 mt-4">
        <div className="w-full">
          <DeliveryAddressForm address={address} setAddress={setAddress} />
          <div className="w-full mt-6 px-5 py-5 space-y-2 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="heading-5">Delivery Type</span>
            <fieldset className="flex flex-col gap-4">
              <div className="space-x-2">
                <Radio
                  id="united-state"
                  name="countries"
                  value="USA"
                  defaultChecked
                />
                <Label htmlFor="united-state">Fast delivery</Label>
              </div>
              <div className="space-x-2">
                <Radio id="germany" name="countries" value="Germany" />
                <Label htmlFor="germany">Standard delivery</Label>
              </div>
              <div className="space-x-2">
                <Radio id="germany" name="countries" value="Germany" />
                <Label htmlFor="germany">Store pickup</Label>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full px-5 pt-2 pb-2 bg-white rounded-lg border border-gray-200 flex-col justify-start items-start inline-flex">
            {isLoading && (
              <div className="w-full flex items-center justify-center">
                <BeatLoader color="#2563eb" />
              </div>
            )}
            {!isLoading && (
              <>
                {cartData?.items?.map((product, index) => {
                  if (product.selected)
                    return (
                      <>
                        {index > 0 && (
                          <hr className="w-full border-t border-gray-200" />
                        )}
                        <CartProduct
                          id={product.id ?? 0}
                          key={product.id}
                          imageURL={product.imageUrl}
                          price={product.unitPrice}
                          title={product.title}
                          defaultValue={product.quantity}
                          selected={product.selected}
                          canEdit={false}
                        />
                      </>
                    );
                })}
              </>
            )}
          </div>
          <OrderPriceSummary
            isLoading={
              createOrderMutation.isPending || createCheckoutMutation.isPending
            }
            originalPrice={
              cartData?.items.reduce((acc, item) => acc + item.unitPrice, 0) ||
              0
            }
            savings={0}
            tax={0}
            storePickup={0}
            onClick={() => {
              console.log(address);
              handleCheckout();
            }}
          />
        </div>
      </div>
    </>
  );
}
