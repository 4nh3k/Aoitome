import { bookApi } from "@/apis/book.api";
import { bookReviewApi } from "@/apis/bookReview.api";
import { recsysApi } from "@/apis/recsys.api";
import { Product } from "@/components/Product/Product";
import { ReviewForm } from "@/components/ReviewForm/ReviewForm";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button, Pagination, Rating } from "flowbite-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Slider from "react-slick";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { cartApi } from "../../apis/cart.api";
import Container from "../../components/Container";
import QuantityInput from "../../components/QuantityInput";
import RatingStar from "../../components/RatingStar";
import Review from "../../components/Review";
import useBookDetails from "../../hooks/useBookDetails";
import { getUIDFromLS } from "../../utils/auth";

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

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export function ProductDetails() {
  const { id } = useParams();
  const uid = getUIDFromLS();
  const { getBookDetails } = useBookDetails(id || "");
  const { data: bookData, isLoading } = getBookDetails;
  const [reviewPage, setReviewPage] = useState(1);
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const { data: reviewData, isLoading: reviewIsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      if (!id || id === "") {
        toast.error("Book not found");
        return;
      }
      console.log("bookId", id);
      const data = await bookReviewApi.getBookReviewByBook(
        parseInt(id),
        reviewPage - 1,
        10
      );
      console.log("data", data);

      return data.data;
    },
  });

  const { data: recommendedBooks, isLoading: recommendedBooksIsLoading } =
    useQuery({
      queryKey: ["recommendedBooks", id],
      queryFn: async () => {
        if (!id || id === "") {
          toast.error("Book not found");
          return;
        }
        console.log("bookId", id);
        const data = await recsysApi.getRecommendations(id);
        console.log("data", data);

        return data.data;
      },
    });

  const similarBooksQueries = useQueries({
    queries: recommendedBooks
      ? recommendedBooks.map((movieId: number) => {
          return {
            queryKey: ["movie", movieId],
            queryFn: () => bookApi.getBook(movieId.toString()),
          };
        })
      : [],
  });

  const isSimilarLoading = similarBooksQueries.some(
    (result) => result.isLoading
  );

  const { data: cartData, isLoading: cartIsLoading } = useQuery({
    queryKey: ["cart", uid],
    queryFn: async () => {
      if (!uid || uid === "") {
        toast.error("User not found");
        return;
      }
      console.log("userId", uid);
      const data = await cartApi.getCart(uid);
      console.log("data", data);

      return data.data;
    },
  });
  const addToCartMutation = useMutation({
    mutationKey: ["addToCart", id],
    mutationFn: async (id: string) => {
      console.log("Add to cart", id);
      if (!bookData) {
        toast.error("Book not found");
        return;
      }
      var items = cartData?.items ?? [];
      if (items.find((item) => item.bookId === bookData.id)) {
        console.log("test");
        items = items.map((item) => {
          if (item.bookId === bookData.id) {
            item.quantity += quantity;
            item.totalUnitPrice = item.unitPrice * item.quantity;
          }
          return item;
        });
      } else {
        console.log("test2");
        items.push({
          imageUrl: bookData?.imageUrl ?? "",
          title: bookData?.title ?? "",
          unitPrice: bookData?.price ?? 0,
          quantity: quantity,
          bookId: bookData?.id,
          oldUnitPrice: bookData?.price ?? 0,
          totalUnitPrice:
            bookData?.price ?? 0 * (1 - (bookData.discountPercentage ?? 0)),
        });
        console.log("cartData", cartData);
      }
      console.log("cartData", cartData);
      await cartApi.updateCart(uid, items);
      toast.success("Add to cart successfully");
      queryClient.invalidateQueries(["cart", uid]);
    },
  });

  return (
    <Fade triggerOnce={true}>
      <Container className="w-full px-6 py-6 bg-white rounded-xl shadow-sm">
        {isLoading && (
          <div className="w-full flex item-centers py-40 justify-center">
            <BeatLoader color="#3F83F8" />
          </div>
        )}
        {!isLoading && (
          <div className="flex px-2">
            <img className="w-80 h-96" src={bookData?.imageUrl} />
            <div className="ml-8 w-full">
              <div className="text-2xl font-semibold">{bookData?.title}</div>
              <div className="flex mt-3">
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Author:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {bookData?.authorName}
                  </span>
                </div>
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Publisher:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {bookData?.publisherName}
                  </span>
                </div>
              </div>
              <div className="flex mt-1">
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Format:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {bookData?.formatName}
                  </span>
                </div>
                <div className="w-1/2">
                  <span className="text-black text-sm font-normal">
                    Num of page:{" "}
                  </span>
                  <span className="text-black text-sm font-bold">
                    {bookData?.numPages}
                  </span>
                </div>
              </div>
              <span className="text-black text-sm font-normal">Genres: </span>
              <span className="text-black text-sm font-semibold">
                {bookData?.bookGenres.map((genre) => genre.name).join(", ")}
              </span>
              <div className="flex justify-start w-full mt-1">
                <RatingStar initialRating={bookData?.averageRating} readonly />
                <p className="ml-2 text-xs font-medium leading-5">
                  {bookData?.averageRating}
                </p>
                <p className="text-xs ml-1 font-semibold text-black underline leading-5">
                  {bookData?.ratingsCount} reviews
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-blue-700 text-3xl font-bold">
                  {(
                    bookData?.price *
                    (1 - bookData?.discountPercentage)
                  ).toFixed(2)}{" "}
                  $
                </span>
                <span className="text-black text-sm font-normal line-through ml-3">
                  {bookData?.price.toFixed(2)} $
                </span>
                <div className="w-11 h-5 px-1.5 ml-3 bg-blue-700 rounded justify-center items-center gap-2.5 inline-flex">
                  <span className="text-white text-xs font-bold">
                    -{(bookData?.discountPercentage * 100).toFixed()}%
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
              <div className=" flex mt-3 items-center justify-start ">
                <span className="text-black text-sm font-normal w-20">
                  Quantity
                </span>
                <QuantityInput
                  quantity={quantity}
                  onQuantityChange={(q) => setQuantity(q)}
                />
              </div>
              <div className="flex mt-5 items-center justify-start ">
                <Button
                  size="sm"
                  outline
                  color="cyan"
                  className="w-36 border-1 border-blue-600"
                  onClick={() => addToCartMutation.mutate(bookData?.id)}
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
        )}
      </Container>
      <Container>
        <p className="heading-4">Product Desciption</p>
        {isLoading && (
          <div className="w-full flex item-centers py-8 justify-center">
            <BeatLoader color="#3F83F8" />
          </div>
        )}

        {!isLoading && (
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
              {bookData?.description}
            </ShowMoreText>
            <div className="space-y-2">
              <div className="flex">
                <p className="min-w-44 text-gray-600">Author</p>
                <p className="min-w-44 text-black">{bookData?.authorName}</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Publisher</p>
                <p className="min-w-44 text-black">{bookData?.publisherName}</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Publication date</p>
                <p className="min-w-44 text-black">
                  {bookData?.publicationDay}/{bookData?.publicationMonth}/
                  {bookData?.publicationYear}
                </p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Weight</p>
                <p className="min-w-44 text-black">
                  {bookData?.itemWeight} pound
                </p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Language</p>
                <p className="min-w-44 text-black">English</p>
              </div>
              <div className="flex">
                <p className="min-w-44  text-gray-600">Format</p>
                <p className="min-w-44 text-black">{bookData?.formatName}</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Dimensions </p>
                <p className="min-w-44 text-black">{bookData?.dimensions}</p>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Container>
        <p className="heading-4">Product Rating</p>
        {reviewIsLoading && (
          <div className="w-full flex item-centers py-8 justify-center">
            <BeatLoader color="#3F83F8" />
          </div>
        )}
        {!reviewIsLoading && (
          <>
            <div className=" border-b-1 border-gray-200 pb-4 mb-4">
              <div className="flex">
                <RatingStar initialRating={bookData?.averageRating} readonly />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {bookData?.averageRating} out of 5
                </p>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {bookData?.ratingsCount} global ratings
              </p>
              {reviewData?.data && (
                <div className="mt-4">
                  <Rating.Advanced percentFilled={70} className="mb-2">
                    5 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={17} className="mb-2">
                    4 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={8} className="mb-2">
                    3 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={4} className="mb-2">
                    2 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={1} className="">
                    1 star
                  </Rating.Advanced>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {!reviewData?.data && <span>No review</span>}
              {reviewData?.data.map((review) => {
                return (
                  <Review
                    review={review}
                    onDelete={function (review: BookReview): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                );
              })}
            </div>
            <div className="flex w-full justify-center mt-2">
              {reviewData?.data && (
                <Pagination
                  currentPage={reviewPage}
                  totalPages={Math.ceil(
                    (reviewData?.totalItems ?? 0) / (reviewData?.pageSize ?? 1)
                  )}
                  onPageChange={() => {}}
                />
              )}
            </div>
          </>
        )}
        <ReviewForm bookId={bookData?.id} />
      </Container>
      <Container className="w-full px-10 py-6 my-8 bg-white rounded-xl">
        {isSimilarLoading && (
          <div className="w-full flex item-centers py-8 justify-center">
            <BeatLoader color="#3F83F8" />
          </div>
        )}
        {!isSimilarLoading && (
          <Slider {...settings}>
            {similarBooksQueries.map((res, index) => {
              return (
                <Product
                  title={res.data?.data.title ?? ""}
                  imageURL={res.data?.data.imageUrl ?? ""}
                  price={res.data?.data.price ?? 0}
                  rating={res.data?.data.ratingsCount ?? 0}
                  discount={res.data?.data.discountPercentage ?? 0}
                  totalRating={res.data?.data.ratingsCount ?? 0}
                  id={res.data?.data.id ?? 0}
                />
              );
            })}
          </Slider>
        )}
      </Container>
    </Fade>
  );
}
