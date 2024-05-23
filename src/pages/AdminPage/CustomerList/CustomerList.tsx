import { useEffect, useState } from "react";
import { Pagination, Select } from "flowbite-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "@/apis/book.api";
import Product from "@/components/Product";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Fade } from "react-awesome-reveal";
import { ClipLoader } from 'react-spinners';
import { User } from "@/types/Models/Identity/User.type";
import authApi from "@/apis/auth.api";
import CustomTable from "@/components/CustomTable";


const CustomerList = () => {

  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [usersInPage, setBooksInPage] = useState<User[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const headers = [
    { label: "ID", prop: "id", className: 'w-fit' },
    { label: "Profile Image", prop: "profileImageLink", isImage: true },
    { label: "Full Name", prop: "fullName" },
    { label: "Username", prop: "userName" },
    { label: "Email", prop: "email" },
    { label: "Address", prop: "address" },
    { label: "Country", prop: "country" },
    { label: "City", prop: "city" },
  ];

  const { data: usersData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['users', { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return authApi.getCustomers(pageIndex - 1, pageSize);
    }
  });

  // const { data: searchUser, isLoading: isSearchUserLoading } = useQuery({
  //   queryKey: ['search_user', { pageIndex, pageSize }],
  //   queryFn: () => {
  //     return bookApi.getSearchBookByPage(searchTerm, pageIndex - 1, pageSize);
  //   }
  // });

  useEffect(() => {
    if (!isLoadingUser && !isSearching) {
      const data = usersData?.data.data;
      const totalItems = usersData?.data.totalItems;
      setBooksInPage(data);
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
    }
    // else if (!isSearchBookLoading && isSearching && searchBook) {
    //   const booksInPage = searchBook?.data.data
    //   setBooksInPage(booksInPage);
    //   const totalItems = searchBook?.data.totalItems;
    //   setTotalItems(totalItems);
    //   console.log("Page index: " + pageIndex);
    //   console.log("Total items: " + totalItems);
    // }
  }, [usersData, usersInPage, isLoadingUser,]);

  // isSearchBookLoading, isSearching, pageIndex, searchBook]);

  // const onChangeSearchTerm = (searchTerm: string) => {
  //   const isSearchTermNull = searchTerm === "" ? true : false;
  //   setIsSearching(!isSearchTermNull);
  //   if (!isSearchTermNull) {
  //     setSearchTerm(searchTerm);
  //     console.log("Search term set: " + searchTerm)
  //   }
  // }

  // const onSearchSubmit = () => {
  //   conditionalInvalidateSearchBookQuery();
  //   if (!isSearchBookLoading && isSearching && searchBook) {
  //     setBooksInPage(searchBook.data.data);
  //     setPageIndex(1);
  //     const totalItems = searchBook.data.totalItems;
  //     setTotalItems(totalItems);
  //     console.log("Page index: " + pageIndex);
  //     console.log("Total items: " + totalItems);
  //     console.log(searchBook.data.data);
  //   }
  // }

  // const conditionalInvalidateSearchBookQuery = () => {
  //   const cachedData = queryClient.getQueryData(['search_book', { pageIndex, pageSize }]);
  //   if (cachedData) {
  //     queryClient.invalidateQueries(['search_book', { pageIndex, pageSize }]);
  //   }
  // };

  const handlePageChange = (e: number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  }

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <span className="text-[1.5rem] font-bold">User</span>
      <div className="flex justify-between items-center self-stretch">
        <SearchInput
          className={"min-w-64"}
          placeholder={"Search user"}
          enableDropdown={false}

        // onChange={onChangeSearchTerm}
        // onSubmit={onSearchSubmit}

        ></SearchInput>
      </div>
      {isLoadingUser &&
        <div className="flex flex-col items-center">
          <ClipLoader color="#8FA8DE" className="items-center justify-center flex" size={100} aria-label="Loading Spinner">
          </ClipLoader>
          <p className="text-primary">Loading...</p>
        </div>}
      <div className="w-fit flex flex-col">
        {!isLoadingUser && usersData && <CustomTable headers={headers} data={usersData.data.data.map((user) => {
          return {
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            address: user.address || '-',
            country: user.country || '-',
            city: user.city || '-',
            profileImageLink: user.profileImageLink || '',
          }
        })} />}
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

export default CustomerList;
