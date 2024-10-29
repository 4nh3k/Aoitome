import { KurumiList } from "@/assets/mockdata";
import Product from "@/components/Product";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { EcommerceProduct } from "./EcommerceProduct";

const Ecommerce = () => {
  return (
    <div className="font-sans">
      <header id="header" className="flex flex-col flex-1">
        <div id="interactions" className="flex gap-4 px-8 py-4">
          <div
            id="container-logo"
            className="flex flex-col items-center text-sm text-[#0a68ff]"
          >
            <img
              src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
              className="w-[96px] h-[40px]"
            />
            <span>Best for you</span>
          </div>
          <div
            id="interaction-panel"
            className="flex flex-1 justify-between items-center gap-4"
          >
            <div
              id="searchbar"
              className="flex flex-row flex-1 rounded-md  border-1 border-gray-300 divide-x divide-gray-300 px-4 py-2 h-fit"
            >
              <div
                id="input-searchbar"
                className="flex flex-1 items-center gap-2 h-8"
              >
                <img
                  className="w-5 h-5"
                  src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                ></img>
                <input
                  className="bg-white appearance-none outline-none focus:ring-0 p-2"
                  placeholder="Elysia"
                ></input>
              </div>
              <div className="py-4 bg-gray-300 mx-4 h-8"></div>
              <button className="border-none outline-none focus:ring-0 text-[#0a68ff] h-8">
                Search
              </button>
            </div>
            <div id="users" className="flex gap-4">
              <button className="flex gap-2">
                <img
                  className="w-6 h-6 inline"
                  src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                ></img>
                <span>Homepage</span>
              </button>
              <button className="flex gap-2">
                <img
                  className="w-6 h-6 inline"
                  src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                ></img>
                Account
              </button>
              <button className="flex gap-2">
                <img
                  className="w-6 h-6 inline"
                  src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                ></img>
                Cart
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <nav id="navbar">
          <div className="flex text-sm">
            <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
              Today's deals
            </button>
            <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
              Buy Again
            </button>
            <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
              Gift Cards
            </button>
            <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
              Sell
            </button>
          </div>
        </nav>
      </header>
      <body
        id="body"
        className="p-4 pt-8 flex flex-row gap-4 bg-[#efefef] min-h-screen"
      >
        <div
          id="product-grid"
          className="w-4/5 h-fit grid grid-cols-5 items-center justify-items-center gap-4 px-4"
        >
          {KurumiList.map((product, index) => {
            return (
              <>
                <EcommerceProduct
                  key={product.title}
                  id={index}
                  title={product.title}
                  imageURL={product.imageURL}
                  price={product.price}
                  rating={product.rating}
                  discount={product.discount ?? 20}
                  totalRating={product.totalRating}
                  isAdmin={true}
                />
              </>
            );
          })}
        </div>
        <div
          id="promotion"
          className="flex justify-items-center items-center mx-auto flex-col gap-5"
        >
          <img
            src="https://salt.tikicdn.com/ts/tka/cb/2c/39/97b40ab7bfd8bf3dee49c2812d838bf6.png"
            width={200}
            height={400}
          />
          <img
            src="https://salt.tikicdn.com/ts/tka/a1/e4/fe/bfccea6eaadfcaadd3271e56e2aaf096.png"
            width={200}
            height={400}
          />
          <img
            src="https://salt.tikicdn.com/ts/tka/50/6e/9a/df57deb67152269828c6a2c4aa3c7fc7.png"
            width={200}
            height={400}
          />
          <img
            src="https://salt.tikicdn.com/ts/tka/8a/85/63/ccfd01318f2157fc1af83c97f03cef0d.png"
            width={200}
            height={400}
          />
        </div>
      </body>
    </div>
  );
};

export default Ecommerce;
