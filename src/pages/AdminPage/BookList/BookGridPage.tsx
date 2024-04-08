import { Pagination, Select } from "flowbite-react";
import { ProductList } from "../../../assets/mockdata";
import Product from "../../../components/Product";
import SearchInput from "../../../components/SearchInput";
const BookGridPage = () => {
  const dropdownList = [
    "Price (Low to High)",
    "Price (High to Low)",
    "Avg Reviews",
  ];
  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <span className="text-[1.5rem] font-bold">Book</span>
      <div className="flex justify-between items-center self-stretch">
        <SearchInput
          className={""}
          placeholder={"Search book"}
          dropdownList={[]}
          dropdownLabel={""}
          enableDropdown={false}
        ></SearchInput>
        <div className="flex justify-end items-center gap-3">
          <span className="text-[1rem] font-normal">Sort by</span>
          <Select required>
            {dropdownList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 justify-items-center w-full gap-[4.5rem] ">
        {ProductList.map((product) => (
          <Product
            title={product.title}
            imageURL={product.imageURL}
            price={product.price}
            rating={product.rating}
            discount={product.discount}
            totalRating={product.totalRating}
          />
        ))}
      </div>
      <Pagination
        className="m-auto"
        currentPage={0}
        onPageChange={function (): void {
          throw new Error("Function not implemented.");
        }}
        totalPages={3}
      ></Pagination>
    </div>
  );
};

export default BookGridPage;
