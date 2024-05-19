import { Pagination, Select } from "flowbite-react";
import Product from "../../../components/Product";
import SearchInput from "../../../components/SearchInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "../../../apis/book.api";
import { useEffect, useState } from "react";
const BookGridPage = () => {
  
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [booksInPage, setBooksInPage] = useState<BookGeneralInfoDTO[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { data: booksData, isLoading: isLoadingBook } = useQuery({
    queryKey: ['books', { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return bookApi.getBookByPage(pageIndex - 1, pageSize);
    }
  });

  const {data: searchBook, isLoading: isSearchBookLoading} = useQuery({
    queryKey: ['search_book', {pageIndex, pageSize}],
    queryFn: () => {
      return bookApi.getSearchBookByPage(searchTerm, pageIndex - 1, pageSize);
    }
  });

  useEffect(() => {
    if (!isLoadingBook && !isSearching){
      const data = booksData?.data.data;
      const totalItems = booksData?.data.totalItems;
      setBooksInPage(data);
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
    }
    else if (!isSearchBookLoading && isSearching){
      const booksInPage = searchBook?.data.data
      setBooksInPage(booksInPage);
      const totalItems = searchBook?.data.totalItems;
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
    }
  }, [booksData, booksInPage, isLoadingBook, isSearchBookLoading, isSearching, pageIndex, searchBook]);

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
    const isSearchTermNull = searchTerm === "" ? true : false;
    setIsSearching(!isSearchTermNull);
    if (!isSearchTermNull){
      setSearchTerm(searchTerm);
      console.log("Search term set: " + searchTerm)
    }
  }

  const onSearchSubmit = () => {
    conditionalInvalidateSearchBookQuery();
    if (!isSearchBookLoading && isSearching && searchBook){
      setBooksInPage(searchBook.data.data);
      setPageIndex(1);
      const totalItems = searchBook.data.totalItems;
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
      console.log(searchBook.data.data);
    }
  }

  const conditionalInvalidateSearchBookQuery = () => {
    const cachedData = queryClient.getQueryData(['search_book', { pageIndex, pageSize }]);
    if (cachedData) {
      queryClient.invalidateQueries(['search_book', { pageIndex, pageSize }]);
    }
  };

  const handlePageChange = (e : number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  }
  
  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <span className="text-[1.5rem] font-bold">Book</span>
      <div className="flex justify-between items-center self-stretch">
        <SearchInput
          className={"min-w-64"}
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
        currentPage={pageIndex}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(totalItems / pageSize)}
      ></Pagination>
    </div>
  );
};

export default BookGridPage;
