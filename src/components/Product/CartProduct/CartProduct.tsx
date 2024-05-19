import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PiHeart, PiX } from "react-icons/pi";
import { toast } from "react-toastify";
import { cartApi } from "../../../apis/cart.api";
import { getUIDFromLS } from "../../../utils/auth";
import Button from "../../Button/Button";
import QuantityInput from "../../QuantityInput";

interface CartProductProps {
  id: number;
  imageURL: string;
  title: string;
  price: number;
  defaultValue: number;
}

export function CartProduct({
  id,
  imageURL,
  title,
  price,
  defaultValue,
}: CartProductProps) {
  // TODO: Add checkbox for selecting product
  const uid = getUIDFromLS();
  const [quantity, setQuantity] = useState(defaultValue);
  const queryClient = useQueryClient();
  const { data: cartData } = useQuery({
    queryKey: ["cart", uid],
    queryFn: async () => {
      console.log("uid", uid);
      const data = await cartApi.getCart(uid ?? "");
      console.log("data", data);
      return data.data;
    },
  });

  const removeProductMutation = useMutation({
    mutationKey: ["removeProduct", uid],
    mutationFn: async () => {
      console.log("updateCartMutation", id);
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }
      const data = cartData.items.filter((item) => item.id !== id);
      await cartApi.updateCart(uid ?? "", data);
      toast.success("Product removed from cart");
      queryClient.invalidateQueries(["cart", uid]);
    },
  });
  const updateQuantityMutation = useMutation({
    mutationKey: ["updateQuantity", uid],
    mutationFn: async () => {
      console.log("updateCartMutation", id);
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }
      const data = cartData.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
      await cartApi.updateCart(uid ?? "", data);
      queryClient.invalidateQueries(["cart", uid]);
    },
  });
  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
    updateQuantityMutation.mutate();
  };
  return (
    <div className="h-32 w-full px-5 py-3.5 bg-white rounded border border-gray-200 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-2.5 flex">
        <img className="h-20" src={imageURL} />
        <div>
          <p className=" text-black text-lg w-60 truncate ">{title}</p>
          <div className="flex space-x-4 mt-1">
            <Button
              icon={PiHeart}
              iconClassName="text-slate-400"
              text="Add to favorites"
              textClassName="text-slate-400 text-sm"
              onClick={() => {}}
            />
            <Button
              icon={PiX}
              iconClassName="text-red-600"
              text="Remove"
              textClassName="text-red-600 text-sm"
              onClick={() => {
                removeProductMutation.mutate();
              }}
            />
          </div>
        </div>
      </div>
      <QuantityInput quantity={quantity} onQuantityChange={onQuantityChange} />
      <div className="text-center w-20 text-black text-lg font-bold">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
}
