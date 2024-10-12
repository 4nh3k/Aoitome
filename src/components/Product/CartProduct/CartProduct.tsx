import { cartApi } from "@/apis/cart.api";
import QuantityInput from "@/components/QuantityInput";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface CartProductProps {
  id: number;
  imageURL: string;
  title: string;
  price: number;
  defaultValue: number;
  canEdit?: boolean;
}

export function CartProduct({
  id,
  imageURL,
  title,
  price,
  defaultValue,
  canEdit = true,
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
      queryClient.invalidateQueries({ queryKey: ["cart", uid ?? ""] });
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
      queryClient.invalidateQueries({ queryKey: ["cart", uid ?? ""] });
    },
  });
  const onQuantityChange = (quantity: number) => {
    console.log("quantity", quantity);
    setQuantity(quantity);
    updateQuantityMutation.mutate();
  };
  return (
    <div className="h-32 w-full pr-5 py-3.5 bg-white justify-between items-center inline-flex">
      <div className="items-center gap-2.5 flex flex-row">
        <Checkbox className="max-w-4 max-h-4 basis-1/12 cursor-pointer" />
        <div className="basis-3/12">
          <img
            className="min-w-16 cursor-pointer h-24 object-cover"
            src={imageURL}
          />
        </div>
        <div className="flex-grow flex-1">
          <p className="text-md font-medium w-60 truncate cursor-pointer">
            {title}
          </p>
        </div>
      </div>
      {canEdit && (
        <QuantityInput
          quantity={quantity}
          onQuantityChange={onQuantityChange}
        />
      )}
      {!canEdit && (
        <div className="text-center w-20 text-black text-lg font-bold">
          x{quantity}
        </div>
      )}
      <div className="text-left w-20 text-black text-md font-semibold">
        ${(price * quantity).toFixed(2)}
      </div>
      {/* <img src={Trash} className="w-5 h-5 transition-colors duration-300 ease-in-out cursor-pointer"/> */}
      <div className="bg-black w-5 h-5 icon-trash svg-icon hover:bg-red-500 hover:text-red-500 select-none cursor-pointer">
        abcxyz
      </div>
    </div>
  );
}
