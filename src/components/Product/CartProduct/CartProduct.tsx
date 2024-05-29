import cartApi from "@/apis/cart.api";
import { CreateCartItemDTO } from "@/types/CartItems/CreateCartItemDto.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PiHeart, PiX } from "react-icons/pi";
import { getUIDFromLS } from "../../../utils/auth";
import Button from "../../Button/Button";
import QuantityInput from "../../QuantityInput";

interface CartProductProps {
  id: string;
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
  console.log("id", id);
  const uid = getUIDFromLS();
  const [quantity, setQuantity] = useState(defaultValue);
  const queryClient = useQueryClient();
  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
    updateQuantityMutation.mutate(
      {
        productItemId: id,
        count: quantity,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["cart", uid]);
        },
      }
    );
  };

  const updateQuantityMutation = useMutation({
    mutationFn: async (body: CreateCartItemDTO) => {
      await cartApi.upsertCartItems(uid, body);
    },
  });

  const handleDeleteMutation = useMutation({
    mutationFn: async () => {
      await cartApi.deleteCartItems(uid, id);
      queryClient.invalidateQueries(["cart", uid]);
    },
  });

  return (
    <div className="h-32 w-full px-5 py-3.5 bg-white rounded border border-gray-200 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-2.5 flex">
        <img className="h-20" src={imageURL} />
        <div>
          <p className=" text-black text-lg w-60 truncate ">{title}</p>
          {canEdit && (
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
                  handleDeleteMutation.mutate();
                }}
              />
            </div>
          )}
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
      <div className="text-center w-20 text-black text-lg font-bold">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
}
