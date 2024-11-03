import { Button } from "flowbite-react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { TbShoppingCartPlus } from "react-icons/tb";
import ShowMoreText from "react-show-more-text";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Container from "../../components/Container";
import QuantityInput from "../../components/QuantityInput";
import RatingStar from "../../components/RatingStar";
import { useLocation } from "react-router-dom";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <PiCaretRight
      className={className}
      fill="black"
      onClick={onClick}
      size={20}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <PiCaretLeft
      className={className}
      fill="black"
      onClick={onClick}
      size={20}
    />
  );
}

export function EcommerceProductDetails() {
  const location = useLocation();
  const state = location.state || {};

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
        className="p-8 pt-8 flex flex-col gap-4 bg-[#efefef] min-h-screen"
      >
        <div className="w-full px-6 py-6 bg-white rounded-xl shadow-sm">
          <div className="flex px-2">
            <img className="w-80 h-96" src={state?.imageUrl} />
            <div className="ml-8 w-full">
              <div className="text-2xl font-semibold">{state?.title}</div>
              <div className="flex mt-3">
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Author:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {state?.authorName}
                  </span>
                </div>
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Publisher:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {state?.publisherName}
                  </span>
                </div>
              </div>
              <div className="flex mt-1">
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Format:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {state?.formatName}
                  </span>
                </div>
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Num of page:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {state?.numPages}
                  </span>
                </div>
              </div>
              <div className="flex justify-start w-full mt-1">
                <RatingStar initialRating={state?.averageRating} readonly />
                <p className="ml-2 text-xs font-medium leading-5">
                  {state?.averageRating}
                </p>
                <p className="text-xs ml-1 font-semibold text-black underline leading-5">
                  {state?.ratingsCount} reviews
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-blue-700 text-3xl font-bold">
                  {(state?.price * (1 - state?.discountPercentage)).toFixed(2)}{" "}
                  $
                </span>
                <span className="text-black text-sm font-normal line-through ml-3">
                  {state?.price.toFixed(2)} $
                </span>
                <div className="w-11 h-5 px-1.5 ml-3 bg-blue-700 rounded justify-center items-center gap-2.5 inline-flex">
                  <span className="text-white text-xs font-bold">
                    -{(state?.discountPercentage * 100).toFixed()}%
                  </span>
                </div>
              </div>
              <div className=" flex mt-3 items-start justify-start ">
                <span className="text-black text-sm font-normal w-20">
                  Delivery
                </span>
                <div>
                  <p className="text-black text-sm font-normal">
                    Deliver to{" "}
                    <b>
                      Bonnie Green- Sacramento 23647{" "}
                      <button className="text-blue-700 ">Change</button>
                    </b>{" "}
                  </p>
                  <p className="text-black text-sm">
                    Shipping - <b>18$</b>
                  </p>
                  <p className="text-black text-sm">
                    Estimated shipping <b>February 27-29</b>
                  </p>
                </div>
              </div>
              {/* <div className=" flex mt-3 items-center justify-start ">
              <span className="text-black text-sm font-normal w-20">
                Quantity
              </span>
              <QuantityInput
                quantity={quantity}
                onQuantityChange={(q) => setQuantity(q)}
              />
            </div> */}
              <div className="flex mt-5 items-center justify-start ">
                <Button
                  size="sm"
                  outline
                  color="cyan"
                  className="w-36 border-1 border-blue-600"
                  onClick={() => {}}
                >
                  <TbShoppingCartPlus
                    size={16}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-600">Add to cart</span>
                </Button>
                <Button size="sm" className="ml-6 w-36">
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 py-4 bg-white rounded-md shadow-sm flex flex-col content-border focus:none">
          <p className="heading-4">Product Desciption</p>
          <div className="flex mt-4">
            <ShowMoreText
              lines={8}
              more="Show more"
              less="Show less"
              className="w-full text-black mr-24"
              anchorClass="text-blue-700 text-base font-bold"
              expanded={false}
              truncatedEndingComponent={"... "}
            >
              {state?.description}
            </ShowMoreText>
            <div className="space-y-2">
              <div className="flex">
                <p className="min-w-44 text-gray-600">Author</p>
                <p className="min-w-44 text-black">{state?.authorName}</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Publisher</p>
                <p className="min-w-44 text-black">{state?.publisherName}</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Publication date</p>
                <p className="min-w-44 text-black">
                  {state?.publicationDay}/{state?.publicationMonth}/
                  {state?.publicationYear}
                </p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Weight</p>
                <p className="min-w-44 text-black">{state?.itemWeight} pound</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Language</p>
                <p className="min-w-44 text-black">English</p>
              </div>
              <div className="flex">
                <p className="min-w-44  text-gray-600">Format</p>
                <p className="min-w-44 text-black">{state?.formatName}</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Dimensions </p>
                <p className="min-w-44 text-black">{state?.dimensions}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
