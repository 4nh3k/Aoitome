import { Pagination, Select } from "flowbite-react";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useDeferredValue, useEffect, useState } from "react";
import { bookReviewApi } from "@/apis/bookReview.api";
import Review from "@/components/Review";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import { ClipLoader } from "react-spinners";

const BookReviewList = () => {
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [reviews, setReviews] = useState<BookReview[]>();
  const deferredReviews = useDeferredValue(reviews);
  const isStale = reviews !== deferredReviews;

  const [filter, setFilter] = useState<string>("Book id");
  const [bookId, setBookId] = useState<number>(1);
  const [userId, setUserId] = useState<string>(
    "4b32e3e1-8c88-425b-9888-87ff254a352a"
  );

  const { data: bookReviewsData, isLoading: isLoadingBookReviews } = useQuery({
    queryKey: ["book-reviews", bookId, { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return bookReviewApi.getBookReviewByBook(bookId, pageIndex - 1, pageSize);
    },
  });

  const { data: userReviewsData, isLoading: isLoadingUserReviews } = useQuery({
    queryKey: ["user-reviews", userId, { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return bookReviewApi.getBookReviewByUser(userId, pageIndex - 1, pageSize);
    },
  });

  const onChangeSearchTerm = (searchTerm: string) => {
    const isSearchTermNull = searchTerm === "" ? true : false;
    if (isSearchTermNull) {
      setReviews([]);
      return;
    }

    if (filter === "Book id") {
      setBookId(parseInt(searchTerm));
    } else if (filter === "User id") {
      setUserId(searchTerm);
    }
  };

  const onChangeDropdown = (value: string) => {
    setFilter(value);
    console.log("Filter: " + value);
  };

  const onSearchSubmit = (value: string) => {
    conditionalInvalidateReviewsQuery();
    if (filter === "User id" && !isLoadingUserReviews) {
      const data = userReviewsData?.data.data;
      const totalItems = userReviewsData?.data.totalItems;
      console.log(data);
      setReviews(data);
      setTotalItems(totalItems);
      setPageIndex(1);
      console.log("Total pages");
      console.log(`${totalItems}/${pageSize}`);
      console.log(Math.ceil(totalItems / pageSize));
    } else if (filter === "Book id" && !isLoadingBookReviews) {
      const data = bookReviewsData?.data.data;
      const totalItems = bookReviewsData?.data.totalItems;
      setTotalItems(totalItems);
      setPageIndex(1);
      console.log(data);
      setReviews(data);
      console.log("Total pages");
      console.log(`${totalItems}/${pageSize}`);
      console.log(Math.ceil(totalItems / pageSize));
    } else {
      setReviews([]);
      setTotalItems(0);
      setPageIndex(1);
    }
  };

  const conditionalInvalidateReviewsQuery = () => {
    queryClient.invalidateQueries(["book-reviews", { pageIndex, pageSize }]);
    queryClient.invalidateQueries(["user-reviews", { pageIndex, pageSize }]);
  };

  const handlePageChange = (e: number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  };

  const deleteBookReviewMutation = useMutation({
    mutationKey: ["delete", "book-review"],
    mutationFn: async (review: BookReview) => {
      const result = await bookReviewApi.deleteBookReview(
        review.userId,
        review.bookId
      );

      if (result.status !== 200) {
        toast.error("Delete review meet errors: " + result.data);
        throw new Error(result.data); // Throw an error to propagate it to onError
      }
      return review;
    },
    onSuccess: (review: BookReview) => {
      toast.success(
        "Successfull deleted the review: " + review.userId + " " + review.bookId
      );
      console.log("----------------------:");

      conditionalInvalidateReviewsQuery();

      if (review === null) return;
      // Update local state or refetch data here
      setReviews((prevReviews) =>
        prevReviews.filter(
          (r) => r.userId !== review.userId || r.bookId !== review.bookId
        )
      );

      // Optionally, you can also invalidate queries to refetch updated data
      conditionalInvalidateReviewsQuery();
    },
    onError: (error: any) => {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete the review: " + error.message);
    },
  });

  const handleDelete = async (review: BookReview) => {
    await deleteBookReviewMutation.mutateAsync(review);
  };

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 justify-between rounded-lg shadow-sm h-screen">
      <div className="flex flex-col gap-4">
        <span className="text-[1.5rem] font-bold">Book review list</span>
        <div className="flex justify-between items-center self-stretch">
          <SearchInput
            className="min-w-64 border-1 border-gray-300 border-sm rounded-l-sm rounded-r-lg p-0 focus-within:[&:has(input:focus)]:border-blue-500 overflow-hidden"
            onChange={onChangeSearchTerm}
            onSubmit={onSearchSubmit}
            enableSizing={true}
            placeholder={"Enter a search term"}
            dropdownList={["Book id", "Customer id"]}
            enableDropdown={true}
            onDropdownChange={onChangeDropdown}
          />
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col items-center">
              <ClipLoader
                color="#8FA8DE"
                className="items-center justify-center flex"
                size={100}
                aria-label="Loading Spinner"
              ></ClipLoader>
              <p className="text-primary">Loading...</p>
            </div>
          }
        >
          <div
            style={{
              opacity: isStale ? 0.5 : 1,
              transition: isStale
                ? "opacity 0.2s 0.2s linear"
                : "opacity 0s 0s linear",
            }}
          >
            <div className="flex flex-col justify-items-center w-full gap-4 ">
              {(!isLoadingUserReviews || !isLoadingBookReviews) &&
                reviews &&
                reviews.map((review) => {
                  return (
                    <Fade>
                      <Review
                        isAdmin={true}
                        review={review}
                        onDelete={handleDelete}
                      />
                    </Fade>
                  );
                })}
            </div>
          </div>
        </Suspense>
      </div>
      <Pagination
        className="mx-auto"
        currentPage={pageIndex}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(totalItems / pageSize)}
      ></Pagination>
    </div>
  );
};

export default BookReviewList;
