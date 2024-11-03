import ProductListItem from "./ProductListItem";
import { KurumiList } from "@/assets/mockdata";

const EcommerceAdmin = () => {
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
        <div className="flex flex-col w-full bg-white h-full mx-[6rem] p-4 rounded-md shadow-sm">
          <div className="flex flex-row justify-between items-center p-6 pt-4">
            <span className="text-xl font-semibold">Product list</span>
            <button className="border-1 rounded-md p-2 px-4 hover:bg-blue-300">
              Add product
            </button>
          </div>
          <div className="px-6">
            <div className="flex flex-row w-full justify-between items-center p-4">
              <div className="flex flex-row gap-4 items-center text-lg">
                Image
                <span className="text-lg text-center">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title
                  &nbsp;&nbsp;&nbsp;
                </span>
              </div>
              <span className="text-lg">&nbsp;&nbsp;&nbsp;&nbsp;Price</span>
              <span className="text-lg mr-6">Avail</span>
              <div className="flex flex-row gap-4 text-lg mr-10">Action</div>
            </div>
            <hr className="w-9/10 border-t border-gray-200" />
          </div>
          {KurumiList.map((product, index) => {
            return (
              <div className="px-4">
                {index > 0 && (
                  <hr className="w-9/10 border-t border-gray-200" />
                )}
                <ProductListItem />
              </div>
            );
          })}
        </div>
      </body>
    </div>
  );
};

export default EcommerceAdmin;
