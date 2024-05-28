import { useEffect, useState } from "react";
import { Pagination, Select } from "flowbite-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "@/apis/book.api";
import Product from "@/components/Product";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Fade } from "react-awesome-reveal";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { ClipLoader } from 'react-spinners';


const BookGridPage = () => {

  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [booksInPage, setBooksInPage] = useState<BookGeneralInfoDTO[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const { data: booksData, isLoading: isLoadingBook } = useQuery({
    queryKey: ['books', { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return bookApi.getBookByPage(pageIndex - 1, pageSize);
    }
  });

  const { data: searchBook, isLoading: isSearchBookLoading } = useQuery({
    queryKey: ['search_book', { pageIndex, pageSize }],
    queryFn: () => {
      return bookApi.getSearchBookByPage(searchTerm, pageIndex - 1, pageSize);
    }
  });

  useEffect(() => {
    if ((isFirstRun || (!isFirstRun && !isSearching)) && !isLoadingBook && booksData) {
      console.log("First run to mount data");
      const data = booksData?.data.data;
      const totalItems = booksData?.data.totalItems;
      setBooksInPage(data);
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
      console.log("First time");
      setIsFirstRun(false);
    }
    
  }, [isFirstRun, isLoadingBook, booksData, pageIndex]);

  useEffect(() => {
     if (!isSearchBookLoading && isSearching && searchBook) {
      const booksInPage = searchBook?.data.data
      setBooksInPage(booksInPage);
      const totalItems = searchBook?.data.totalItems;
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
    }
  }, [isSearchBookLoading, searchBook, isSearching, pageIndex]);

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
  };

  useEffect(() => {
    if (isFirstRun) return;
    console.log("Began sorting....")
    let sortedValues = isSearching ? [...searchBook?.data.data] : [...booksData?.data.data];
    console.log(sortedValues)

    switch (selectedSort) {
      case "Price (Low to High)":
        sortedValues?.sort((a, b) => a.price * a.discountPercentage - b.price * b.discountPercentage)
        break;
      case "Price (High to Low)":
        sortedValues?.sort((a, b) => b.price * b.discountPercentage - a.price * a.discountPercentage)
        break;
      case "Avg Reviews":
        sortedValues?.sort((a, b) => a.averageRating - b.averageRating)
        break;
    }
    console.log("Sorted values:")
    console.log(sortedValues);
    setBooksInPage(sortedValues);
  }, [selectedSort]);

  const onChangeSearchTerm = (searchTerm: string) => {
    const isSearchTermNull = searchTerm === "" ? true : false;
    setIsSearching(!isSearchTermNull);
    if (!isSearchTermNull) {
      setSearchTerm(searchTerm);
      console.log("Search term set: " + searchTerm)
    }
  }

  const onSearchSubmit = () => {
    conditionalInvalidateSearchBookQuery();
    if (!isSearchBookLoading && isSearching && searchBook) {
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

  const handlePageChange = (e: number) => {
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
      {isLoadingBook &&
        <div className="flex flex-col items-center">
          <ClipLoader color="#8FA8DE" className="items-center justify-center flex" size={100} aria-label="Loading Spinner">
          </ClipLoader>
          <p className="text-primary">Loading...</p>
        </div>}
      <div className="grid grid-cols-4 justify-items-center w-full gap-[4.5rem] ">
        {!isLoadingBook && booksInPage && booksInPage.map((product) => {
          return (
            <Fade triggerOnce={true}>
              <Product key={product.id}
                id={product.id}
                title={product.title}
                imageURL={product.imageUrl}
                price={product.price}
                rating={product.averageRating}
                discount={product.discountPercentage}
                totalRating={product.ratingsCount}
                isAdmin={true} />
            </Fade>
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
