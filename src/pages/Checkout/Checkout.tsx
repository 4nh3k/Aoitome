import cartApi from "@/apis/cart.api";
import orderApi from "@/apis/order.api";
import { CreateDeliveryDTO } from "@/types/Deliveries/CreateDeliveryDto.type";
import { CreateNewOrderFromCartDTO } from "@/types/Orders/CreateNewOrderFromCartDto.type";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label, Radio } from "flowbite-react";
import { useState } from "react";
import DeliveryAddressForm from "../../components/DeliveryAddressFrom";
import OrderPriceSummary from "../../components/OrderPriceSummary";
import CartProduct from "../../components/Product/CartProduct";

export function Checkout() {
  const userId = getUIDFromLS();
  const [deliveryAddress, setDeliveryAddress] = useState<CreateDeliveryDTO>({
    isDepartment: false,
    receiverIsMe: false,
    information: "",
    province: "",
    district: "",
    ward: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("VNPAY");

  const checkOut = useMutation({
    mutationFn: async () => {
      var order: CreateNewOrderFromCartDTO = {
        cartItemIds: cartData?.items?.map((item) => item.id) ?? [],
        deliveryDto: deliveryAddress,
        paymentMethod: paymentMethod,
      };
      const res = await orderApi.addOrderFromCart(order);
      window.location.href = res.data;
    },
  });

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      console.log("userId", userId);
      const data = await cartApi.getCartItems(userId);

      console.log("data", data.data);

      return data.data.result;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleCheckout = () => {
    console.log("deliveryAddress", deliveryAddress);
    var res = checkOut.mutate();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="heading-4">Checkout</div>
      <div className="flex w-full space-x-10 mt-4">
        <div className="w-full">
          <DeliveryAddressForm
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
          />

          <div className="w-full mt-6 px-5 py-5 space-y-2 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="heading-5">Payment details</span>
            <fieldset className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="VNPAY"
                  name="countries"
                  value="VNPAY"
                  defaultChecked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Label htmlFor="united-state">Online banking</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="COD"
                  name="countries"
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Label htmlFor="germany">COD</Label>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full space-y-2 mb-6">
            {cartData?.items?.map((product) => (
              <CartProduct
                id={product.id}
                key={product.id}
                canEdit={false}
                imageURL={product.image}
                price={product.salePrice}
                title={product.nameProduct}
                defaultValue={product.count}
              />
            ))}
          </div>
          <OrderPriceSummary
            originalPrice={cartData?.totalPrice}
            savings={0}
            storePickup={0}
            tax={0}
            onClick={() => handleCheckout()}
          />
        </div>
      </div>
    </>
  );
}
