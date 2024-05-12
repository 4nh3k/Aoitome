import { useQuery } from "@tanstack/react-query";
import { Button, TextInput } from "flowbite-react";
import { cartApi } from "../../apis/cart.api";
import { ProductList } from "../../assets/mockdata";
import OrderPriceSummary from "../../components/OrderPriceSummary";
import Product from "../../components/Product";
import CartProduct from "../../components/Product/CartProduct";
import { path } from "../../constants/path";
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="heading-4">Shopping Cart</div>
      {/* <p className="text-gray-500">Your cart is empty</p> */}
      <div className="flex w-full space-x-12 mt-4">
        <div className="w-full space-y-4">
          {data?.items.map((product) => (
            <CartProduct
              key={product.id}
              imageURL={product.imageUrl}
              price={product.unitPrice}
              title={product.title}
            />
          ))}
        </div>
        <div className="w-[25rem]">
          <OrderPriceSummary path={path.checkout} />
          <div className="w-full px-5 pt-5 pb-6 mt-8 space-y-4 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="w-80 text-black text-sm">
              Do you have a voucher or gift card ?
            </span>
            <TextInput className="w-full" />
            <Button className="w-full" size="sm">
              Apply Code
            </Button>
          </div>
        </div>
      </div>
      <div className="heading-4 mt-10">People also bought</div>
      <div className="flex w-full space-x-4 mt-4">
        {ProductList.slice(0, 5).map((product, index) => (
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
    </>
  );
}
