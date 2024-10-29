import { cartApi } from "@/apis/cart.api";
import Trash from "@/assets/icon/trash_icon.svg";
import { KurumiList } from "@/assets/mockdata";
import OrderPriceSummary from "@/components/OrderPriceSummary";
import Product from "@/components/Product";
import CartProduct from "@/components/Product/CartProduct/CartProduct";
import { path } from "@/constants/path";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Cart() {
  const userId = getUIDFromLS();
  const queryClient = useQueryClient();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      console.log("userId", userId);
      const data = await cartApi.getCart(userId);
      console.log("data", data);
      return data.data;
    },
  });

  const updateAllCartItemSelection = useMutation({
    mutationKey: ["update-cart", userId],
    mutationFn: async () => {
      console.log("updateCartMutation", userId);
      if (!cartData) {
        return;
      }
      const data = cartData.items.map((item) => {
        return {
          ...item,
          selected: selectAllChecked,
        };
      });
      await cartApi.updateCart(userId ?? "", data);
    },
    onSuccess: () => {
      console.log("Successfully updated selection");
      queryClient.invalidateQueries(["cart", userId]);
    },
  });

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const handleSelectAll = (e) => {
    console.log("Select all status: ", e.target.checked);
    setSelectAllChecked(e.target.checked);
  };

  useEffect(() => {
    updateAllCartItemSelection.mutate();
  }, [selectAllChecked]);

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const isCartEmpty = !cartData?.items || cartData?.items?.length === 0;

  return (
    <>
      <div className="heading-5">
        Shopping Cart {isCartEmpty ? "" : `(${cartData.items.length} products)`}
      </div>
      {/* <p className="text-gray-500">Your cart is empty</p> */}
      <div className="flex w-full space-x-8 mt-4">
        <div className="w-full space-y-4">
          {isCartEmpty && (
            <div className="w-full px-5 pt-10 pb-8 space-y-4 bg-white rounded border border-gray-200 flex-col justify-center items-center">
              <img
                src="/src/assets/icon/ico_emptycart.svg"
                className="w-full h-40"
              />
              <div className="w-full text-lg text-center text-black ">
                Your cart is empty
              </div>
              <Link className="w- flex justify-center" to="/">
                <Button className="w-fit" size="sm">
                  Buy now
                </Button>
              </Link>
            </div>
          )}
          {!isCartEmpty && (
            <>
              {" "}
              <div className="h-fit w-full px-5 py-3 bg-white rounded-lg border border-gray-200 justify-between items-center inline-flex">
                <div className="flex justify-start items-center gap-2.5 w-[21rem] text-md font-semibold">
                  <Checkbox
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                    className="max-w-4 max-h-4 basis-1/12 cursor-pointer"
                  />
                  <span>
                    Select all products{" "}
                    {isCartEmpty ? "" : `(${cartData.items.length} products)`}
                  </span>
                </div>
                <div className="ml-1 text-center w-20 text-black text-md font-semibold">
                  Quantity
                </div>
                <div className="text-left ml-1 w-fit text-black text-md font-semibold">
                  Amount
                </div>
                <button className="border-none bg-transparent appearance-none, p-0 cursor-pointer">
                  <img src={Trash} className="w-5 h-5 invisible" />
                </button>
              </div>
              <div className="w-full px-5 pt-2 pb-2 bg-white rounded-lg border border-gray-200 flex-col justify-start items-start inline-flex">
                {!isLoading &&
                  cartData?.items?.map((product, index) => (
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
                      />
                    </>
                  ))}
              </div>
            </>
          )}
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
        {!isCartEmpty && (
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
                cartData?.items?.reduce(
                  (acc, item) =>
                    item.selected
                      ? acc +
                        parseFloat(item.unitPrice.toFixed(2)) * item.quantity
                      : acc,
                  0
                ) || 0
              }
              savings={0}
              tax={0}
              storePickup={0}
              onClick={() => navigate(`../${path.checkout}`)}
            />
          </div>
        )}
      </div>
    </>
  );
}
