import { cartApi } from "@/apis/cart.api";
import QuantityInput from "@/components/QuantityInput";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartProductProps {
  id: number;
  imageURL: string;
  title: string;
  price: number;
  defaultValue: number;
  canEdit?: boolean;
  selected: boolean;
}

const CartProduct: React.FC<CartProductProps> = ({
  id,
  imageURL,
  title,
  price,
  defaultValue,
  canEdit = true,
  selected,
}) => {
  // TODO: Add checkbox for selecting product
  const uid = getUIDFromLS();

  const [cartAttr, setCartAttr] = useState({
    quantity: defaultValue,
    selected: selected,
  });

  useEffect(() => {
    setCartAttr({
      ...cartAttr,
      selected: selected,
    });
  }, [selected])

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

  const updateCartItem = useMutation({
    mutationKey: ["updateQuantity", uid],
    mutationFn: async () => {
      console.log("updateCartMutation", id);
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }
      const data = cartData.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: cartAttr.quantity,
            selected: cartAttr.selected,
          };
        }
        return item;
      });
      await cartApi.updateCart(uid ?? "", data);
      queryClient.invalidateQueries({ queryKey: ["cart", uid ?? ""] });
    },
  });

  const onQuantityChange = (quantity: number) => {
    console.log("quantity", quantity);
    setCartAttr({
      ...cartAttr,
      quantity: quantity,
    });
  };

  const onSelectedChange = (e) => {
    const selectedValue = e.target.checked;
    console.log("Current value: ", cartAttr.selected);
    console.log("New value: ", selectedValue);
    setCartAttr({
      ...cartAttr,
      selected: selectedValue,
    });
  };

  useEffect(() => {
    updateCartItem.mutate();
  }, [cartAttr]);

  return (
    <div
      className={`h-32 w-full py-3.5 bg-white justify-between items-center inline-flex ${
        canEdit ? "pr-5" : ""
      }`}
    >
      <div className="items-center gap-2.5 flex flex-row">
        {canEdit && (
          <Checkbox
            checked={cartAttr.selected}
            onChange={onSelectedChange}
            className="max-w-4 max-h-4 basis-1/12 cursor-pointer"
          />
        )}
        <div className="basis-3/12">
          <img
            className="min-w-16 w-16 cursor-pointer h-24 object-cover"
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
          quantity={cartAttr.quantity}
          onQuantityChange={onQuantityChange}
        />
      )}
      {!canEdit && (
        <div className="text-center w-20 text-black text-lg font-bold">
          x{cartAttr.quantity}
        </div>
      )}
      <div className="text-right w-20 text-black text-md font-semibold">
        ${(price * cartAttr.quantity).toFixed(2)}
      </div>
      {/* <img src={Trash} className="w-5 h-5 transition-colors duration-300 ease-in-out cursor-pointer"/> */}
      {canEdit && (
        <div
          className="bg-black w-5 h-5 icon-trash svg-icon hover:bg-red-500 hover:text-red-500 select-none cursor-pointer"
          onClick={() => removeProductMutation.mutate()}
        >
          abcxyz
        </div>
      )}
    </div>
  );
};

export default CartProduct;
