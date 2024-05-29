import { useEffect, useState } from "react";
import { Pagination, Select } from "flowbite-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/apis/product.api";
import Product from "@/components/Product";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Fade } from "react-awesome-reveal";
import { ClipLoader } from 'react-spinners';
import { ProductResponseDto } from "@/types/Products/ProductResponseDto.type";


const ProductGrid = () => {
  const LOADING_SIZE = 10000;
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [productsInPage, setProductsInPage] = useState<ProductResponseDto[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const { data: productsData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['products', { pageIndex, pageSize }],
    queryFn: () => {
      return productApi.getAllProducts(pageIndex, pageSize);
    }
  });

  const { data: searchProduct, isLoading: isSearchProductLoading } = useQuery({
    queryKey: ['search_product', { pageIndex, pageSize }],
    queryFn: () => {
      return productApi.searchProduct(pageIndex, pageSize, searchTerm);
    }
  });


  useEffect(() => {
    if ((isFirstRun || (!isFirstRun && !isSearching)) && !isLoadingProduct && productsData) {
      console.log("First run to mount data");
      const data = productsData?.data.result;
      const totalItems = productsData?.data.result?.length;
      setProductsInPage(data);
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
      console.log("First time");
      setIsFirstRun(false);
    }

  }, [isFirstRun, isLoadingProduct, productsData, pageIndex]);

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
    let sortedValues = isSearching ? [...searchProduct?.data.data] : [...productsData?.data.data];
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
    setProductsInPage(sortedValues);
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
    if (!isSearchProductLoading && isSearching && searchProduct) {
      console.log("Search product");
      console.log(searchProduct)
      setProductsInPage(searchProduct.data.result);
      setPageIndex(1);
      const totalItems = searchProduct.data.result?.length;
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
      console.log(searchProduct.data.result);
    }
  }

  const conditionalInvalidateSearchBookQuery = () => {
    const cachedData = queryClient.getQueryData(['search_book', { pageIndex, pageSize }]);
    if (cachedData) {
      queryClient.invalidateQueries(['search_product', { pageIndex, pageSize }]);
    }
  };

  const handlePageChange = (e: number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  }

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <span className="text-[1.5rem] font-bold">Products</span>
      <div className="flex justify-between items-center self-stretch">
        <SearchInput
          className={"min-w-64"}
          placeholder={"Search product"}
          dropdownList={[]}
          enableDropdown={false}
          onChange={onChangeSearchTerm}
          onSubmit={onSearchSubmit}
        ></SearchInput>
        <div className="flex justify-end items-center gap-3">
          <span className="text-[1rem] font-normal">Sort by</span>
          <Select required value={selectedSort}
            onChange={handleSortChange}
          >
            {sortChoices.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {isLoadingProduct &&
        <div className="flex flex-col items-center">
          <ClipLoader color="#8FA8DE" className="items-center justify-center flex" size={100} aria-label="Loading Spinner">
          </ClipLoader>
          <p className="text-primary">Loading...</p>
        </div>}
      <div className="grid grid-cols-4 justify-items-center w-full gap-[4.5rem] ">
        {!isLoadingProduct && productsInPage && productsInPage.map((product) => {
          return (
            <Fade triggerOnce={true}>
              <Product key={product.id}
                id={product.id}
                title={product.name}
                imageURL={product.items[0].image}
                price={product.items[0].price}
                rating={product.averageRating}
                discount={product.items[0].discountPercentage}
                totalRating={product.ratingCount}
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

export default ProductGrid;
