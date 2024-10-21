import { cartApi } from "@/apis/cart.api";
import Trash from "@/assets/icon/trash_icon.svg";
import { KurumiList, ProductList } from "@/assets/mockdata";
import OrderPriceSummary from "@/components/OrderPriceSummary";
import Product from "@/components/Product";
import CartProduct from "@/components/Product/CartProduct";
import { path } from "@/constants/path";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getUIDFromLS } from "../../utils/auth";

export function Cart() {
  const userId = getUIDFromLS();
  const { data, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      console.log("userId", userId);
      const data = await cartApi.getCart(userId);
      console.log("data", data);

      return data.data;
    },
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="heading-5">Shopping Cart (x products)</div>
      {/* <p className="text-gray-500">Your cart is empty</p> */}
      <div className="flex w-full space-x-8 mt-4">
        <div className="w-full space-y-4">
          {!data?.items ||
            (data.items.length === 0 && (
              <div className="w-full px-5 pt-5 pb-6 space-y-4 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
                <span className="w-80 text-black text-sm">
                  Your cart is empty
                </span>
              </div>
            ))}
          <div className="h-fit w-full px-5 py-3 bg-white rounded-lg border border-gray-200 justify-between items-center inline-flex">
            <div className="flex justify-start items-center gap-2.5 w-[21rem] text-md font-semibold">
              <Checkbox className="max-w-4 max-h-4 basis-1/12 cursor-pointer" />
              <span>Select all products (x products)</span>
            </div>
            <div className="ml-1 text-center w-20 text-black text-md font-semibold">
              Quantity
            </div>
            <div className="text-left mr-3 w-fit text-black text-md font-semibold">
              Amount
            </div>
            <button className="border-none bg-transparent appearance-none, p-0 cursor-pointer">
              <img src={Trash} className="w-5 h-5 invisible" />
            </button>
          </div>
          <div className="w-full px-5 pt-2 pb-2 bg-white rounded-lg border border-gray-200 flex-col justify-start items-start inline-flex">
            {data?.items?.map((product, index) => (
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
                />
              </>
            ))}
          </div>
          <div className="flex flex-col bg-white px-5 py-3 rounded-md border-1 justify-between pb-0">
            <div className="heading-5">People also bought</div>
            <div className="flex w-full bg-white justify-between space-x-4 mt-2 rounded-md">
              {KurumiList.slice(0, 4).map((product, index) => (
                <Product
                  key={index}
                  title={product.title}
                  imageURL={product.imageURL}
                  price={product.price}
                  rating={product.rating}
                  discount={product.discount}
                  totalRating={product.totalRating}
                  id={0}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[30rem] gap-4 flex flex-col ">
          <div className="w-full px-5 pt-5 pb-6 space-y-4 bg-white rounded-lg border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="w-80 text-black text-sm">
              Do you have a voucher or gift card ?
            </span>
            <TextInput className="w-full" />
            <Button className="w-full" size="sm">
              Apply Code
            </Button>
          </div>
          <OrderPriceSummary
            originalPrice={
              data?.items?.reduce(
                (acc, item) =>
                  acc + parseFloat(item.unitPrice.toFixed(2)) * item.quantity,
                0
              ) || 0
            }
            savings={0}
            tax={0}
            storePickup={0}
            onClick={() => navigate(path.checkout)}
          />
        </div>
      </div>
    </>
  );
}
