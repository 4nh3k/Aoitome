import { Pagination, Select } from "flowbite-react";
import Product from "../../../components/Product";
import SearchInput from "../../../components/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../../apis/book.api";
import { useEffect, useState } from "react";
const BookGridPage = () => {

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [booksInPage, setBooksInPage] = useState<BookGeneralInfoDTO[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: booksData, isLoading: isLoadingBook } = useQuery({
    queryKey: ['books', { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return bookApi.getBookByPage(pageIndex, pageSize);
    }
  });

  const {data: searchBook, isLoading: isSearchBookLoading} = useQuery({
    queryKey: ['search_book', {pageIndex, pageSize}],
    queryFn: () => bookApi.getSearchBookByPage(searchTerm, pageIndex, pageSize)
  });

  useEffect(() => {
    if (!isLoadingBook){
      const data = booksData?.data.data;
      setBooksInPage(data)
    }
  }, [booksData, booksInPage, isLoadingBook]);

  const sortChoices = [
    "Price (Low to High)",
    "Price (High to Low)",
    "Avg Reviews",
  ];

  const [selectedSort, setSelectedSort] = useState(sortChoices[0]);

  // Handle change event
  const handleSortChange = (event) => {
    console.log(event.target.value);
    setSelectedSort(event.target.value);
    let sortedValues = booksInPage;
    switch (selectedSort) {
        case "Price (Low to High)":
          sortedValues = sortedValues?.sort((a, b) => b.price * b.discountPercentage - a.price * a.discountPercentage)
          return
        case "Price (High to Low)":
          sortedValues = sortedValues?.sort((a, b) => a.price * a.discountPercentage - b.price * b.discountPercentage)
          return
        case "Avg Reviews":
          sortedValues = sortedValues?.sort((a, b) => b.averageRating - a.averageRating)
          return
      }
    console.log(sortedValues)
    setBooksInPage(sortedValues);
  };
  
  const onChangeSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  }
  const onSearchSubmit = (searchTerm: string) => {
    if (!isSearchBookLoading && searchBook){
      setBooksInPage(searchBook.data.data);
    }
  }
  
  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <span className="text-[1.5rem] font-bold">Book</span>
      <div className="flex justify-between items-center self-stretch">
        <SearchInput
          className={""}
          placeholder={"Search book"}
          dropdownList={[]}
          enableDropdown={false}
          onChange={onChangeSearchTerm}
          onSubmit={onSearchSubmit}
        ></SearchInput>
        <div className="flex justify-end items-center gap-3">
          <span className="text-[1rem] font-normal">Sort by</span>
          <Select required value={selectedSort} onChange={handleSortChange}>
            {sortChoices.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 justify-items-center w-full gap-[4.5rem] ">
       {!isLoadingBook && booksInPage && booksInPage.map((product) => {
          return (
            <Product key={product.id}
              title={product.title}
              imageURL={product.imageUrl}
              price={product.price}
              rating={product.averageRating}
              discount={product.discountPercentage}
              totalRating={product.ratingsCount} />
          );
        })}
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
