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
import {
  PiCaretLeft,
  PiCaretRight,
  PiThumbsUp,
  PiWarningCircleLight,
} from "react-icons/pi";
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
import Coupon from "@/components/Coupon/Coupon";
import { KurumiList } from "@/assets/mockdata";
import { PiNotePencilBold } from "react-icons/pi";
import FsLightbox from "fslightbox-react";
import { PiList, PiShoppingCart, PiUser } from "react-icons/pi";
import Policy from "@/components/Policy/Policy";
import ChevronUp from "@/assets/icon/chevron-up-outline.svg";

function NextArrow(props: any) {
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

function PrevArrow(props: any) {
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
  // const { id } = useParams();
  // const uid = getUIDFromLS();
  // const { getBookDetails } = useBookDetails(id || "");
  // const { data: bookData, isLoading } = getBookDetails;
  // const [reviewPage, setReviewPage] = useState(1);
  // const queryClient = useQueryClient();
  // const [quantity, setQuantity] = useState(1);
  // const { data: reviewData, isLoading: reviewIsLoading } = useQuery({
  //   queryKey: ["reviews", id],
  //   queryFn: async () => {
  //     if (!id || id === "") {
  //       toast.error("Book not found");
  //       return;
  //     }
  //     console.log("bookId", id);
  //     const data = await bookReviewApi.getBookReviewByBook(
  //       parseInt(id),
  //       reviewPage - 1,
  //       10
  //     );
  //     console.log("data", data);

  //     return data.data;
  //   },
  // });

  // const { data: recommendedBooks, isLoading: recommendedBooksIsLoading } =
  //   useQuery({
  //     queryKey: ["recommendedBooks", id],
  //     queryFn: async () => {
  //       if (!id || id === "") {
  //         toast.error("Book not found");
  //         return;
  //       }
  //       console.log("bookId", id);
  //       const data = await recsysApi.getRecommendations(id);
  //       console.log("data", data);

  //       return data.data;
  //     },
  //   });

  // const similarBooksQueries = useQueries({
  //   queries: recommendedBooks
  //     ? recommendedBooks.map((movieId: number) => {
  //         return {
  //           queryKey: ["movie", movieId],
  //           queryFn: () => bookApi.getBook(movieId.toString()),
  //         };
  //       })
  //     : [],
  // });

  // const isSimilarLoading = similarBooksQueries.some(
  //   (result) => result.isLoading
  // );

  // const { data: cartData, isLoading: cartIsLoading } = useQuery({
  //   queryKey: ["cart", uid],
  //   queryFn: async () => {
  //     if (!uid || uid === "") {
  //       toast.error("User not found");
  //       return;
  //     }
  //     console.log("userId", uid);
  //     const data = await cartApi.getCart(uid);
  //     console.log("data", data);

  //     return data.data;
  //   },
  // });
  // const addToCartMutation = useMutation({
  //   mutationKey: ["addToCart", id],
  //   mutationFn: async (id: string) => {
  //     console.log("Add to cart", id);
  //     if (!bookData) {
  //       toast.error("Book not found");
  //       return;
  //     }
  //     var items = cartData?.items ?? [];
  //     if (items.find((item) => item.bookId === bookData.id)) {
  //       console.log("test");
  //       items = items.map((item) => {
  //         if (item.bookId === bookData.id) {
  //           item.quantity += quantity;
  //           item.totalUnitPrice = item.unitPrice * item.quantity;
  //         }
  //         return item;
  //       });
  //     } else {
  //       console.log("test2");
  //       items.push({
  //         imageUrl: bookData?.imageUrl ?? "",
  //         title: bookData?.title ?? "",
  //         unitPrice: bookData?.price ?? 0,
  //         quantity: quantity,
  //         bookId: bookData?.id,
  //         oldUnitPrice: bookData?.price ?? 0,
  //         totalUnitPrice:
  //           bookData?.price ?? 0 * (1 - (bookData.discountPercentage ?? 0)),
  //       });
  //       console.log("cartData", cartData);
  //     }
  //     console.log("cartData", cartData);
  //     await cartApi.updateCart(uid, items);
  //     toast.success("Add to cart successfully");
  //     queryClient.invalidateQueries(["cart", uid]);
  //   },
  // });
  const MAX_DISPLAY_NUM_IMAGE_GALLERY = 4;
  const bookData = {
    productCode: "9784040743639",
    supplier: "Kinokuniya Book Stores",
    author: "東出 祐一郎, 橘 公司, NOCO",
    publisher: "Kadokawa",
    publishYear: 2022,
    language: "Tiếng Nhật",
    weight: 200,
    size: "14.9 x 10.6 x 1.6 cm",
    quantityOfPage: 280,
    bookLayout: "Paperback",
  };

  // Create Title and Description Lists
  const titles = [
    "Product code",
    "Supplier",
    "Author",
    "Publisher",
    "Publish Year",
    "Language",
    "Weight",
    "Size",
    "Quantity of Page",
    "Book Layout",
  ];

  const lstImg = [
    "https://cdn0.fahasa.com/media/catalog/product/9/7/9784040743639.jpg",
    "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/__date_a_barrette_date_a_live_fragment_8/2024_06_19_14_51_08_2-390x510.png",
    "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/__date_a_barrette_date_a_live_fragment_8/2024_06_19_14_51_08_1-390x510.png",
    "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
    "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
    "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
  ];

  const [toggler, setToggler] = useState(false);
  const [toggleDescr, setToggleDescr] = useState(false);

  return (
    // <Fade triggerOnce={true}>
    //   <Container className="w-full px-6 py-6 bg-white rounded-xl shadow-sm">
    //     {isLoading && (
    //       <div className="w-full flex item-centers py-40 justify-center">
    //         <BeatLoader color="#3F83F8" />
    //       </div>
    //     )}
    //     {!isLoading && (
    //       <div className="flex px-2">
    //         <img className="w-80 h-96" src={bookData?.imageUrl} />
    //         <div className="ml-8 w-full">
    //           <div className="text-2xl font-semibold">{bookData?.title}</div>
    //           <div className="flex mt-3">
    //             <div className="w-1/2">
    //               <span className="text-black text-sm font-normal">
    //                 Author:{" "}
    //               </span>
    //               <span className="text-black text-sm font-bold">
    //                 {bookData?.authorName}
    //               </span>
    //             </div>
    //             <div className="w-1/2">
    //               <span className="text-black text-sm font-normal">
    //                 Publisher:{" "}
    //               </span>
    //               <span className="text-black text-sm font-bold">
    //                 {bookData?.publisherName}
    //               </span>
    //             </div>
    //           </div>
    //           <div className="flex mt-1">
    //             <div className="w-1/2">
    //               <span className="text-black text-sm font-normal">
    //                 Format:{" "}
    //               </span>
    //               <span className="text-black text-sm font-bold">
    //                 {bookData?.formatName}
    //               </span>
    //             </div>
    //             <div className="w-1/2">
    //               <span className="text-black text-sm font-normal">
    //                 Num of page:{" "}
    //               </span>
    //               <span className="text-black text-sm font-bold">
    //                 {bookData?.numPages}
    //               </span>
    //             </div>
    //           </div>
    //           <span className="text-black text-sm font-normal">Genres: </span>
    //           <span className="text-black text-sm font-semibold">
    //             {bookData?.bookGenres.map((genre) => genre.name).join(", ")}
    //           </span>
    //           <div className="flex justify-start w-full mt-1">
    //             <RatingStar initialRating={bookData?.averageRating} readonly />
    //             <p className="ml-2 text-xs font-medium leading-5">
    //               {bookData?.averageRating}
    //             </p>
    //             <p className="text-xs ml-1 font-semibold text-black underline leading-5">
    //               {bookData?.ratingsCount} reviews
    //             </p>
    //           </div>

    //           <div className="flex items-center">
    //             <span className="text-blue-700 text-3xl font-bold">
    //               {(
    //                 bookData?.price *
    //                 (1 - bookData?.discountPercentage)
    //               ).toFixed(2)}{" "}
    //               $
    //             </span>
    //             <span className="text-black text-sm font-normal line-through ml-3">
    //               {bookData?.price.toFixed(2)} $
    //             </span>
    //             <div className="w-11 h-5 px-1.5 ml-3 bg-blue-700 rounded justify-center items-center gap-2.5 inline-flex">
    //               <span className="text-white text-xs font-bold">
    //                 -{(bookData?.discountPercentage * 100).toFixed()}%
    //               </span>
    //             </div>
    //           </div>
    //           <div className=" flex mt-3 items-start justify-start ">
    //             <span className="text-black text-sm font-normal w-20">
    //               Delivery
    //             </span>
    //             <div>
    //               <p className="text-black text-sm font-normal">
    //                 Deliver to{" "}
    //                 <b>
    //                   Bonnie Green- Sacramento 23647{" "}
    //                   <button className="text-blue-700 ">Change</button>
    //                 </b>{" "}
    //               </p>
    //               <p className="text-black text-sm">
    //                 Shipping - <b>18$</b>
    //               </p>
    //               <p className="text-black text-sm">
    //                 Estimated shipping <b>February 27-29</b>
    //               </p>
    //             </div>
    //           </div>
    //           <div className=" flex mt-3 items-center justify-start ">
    //             <span className="text-black text-sm font-normal w-20">
    //               Quantity
    //             </span>
    //             <QuantityInput
    //               quantity={quantity}
    //               onQuantityChange={(q) => setQuantity(q)}
    //             />
    //           </div>
    //           <div className="flex mt-5 items-center justify-start ">
    //             <Button
    //               size="sm"
    //               outline
    //               color="cyan"
    //               className="w-36 border-1 border-blue-600"
    //               onClick={() => addToCartMutation.mutate(bookData?.id)}
    //             >
    //               <TbShoppingCartPlus
    //                 size={16}
    //                 className="mr-2 text-blue-600"
    //               />
    //               <span className="text-blue-600">Add to cart</span>
    //             </Button>
    //             <Button size="sm" className="ml-6 w-36">
    //               Buy now
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </Container>
    //   <Container>
    //     <p className="heading-4">Product Desciption</p>
    //     {isLoading && (
    //       <div className="w-full flex item-centers py-8 justify-center">
    //         <BeatLoader color="#3F83F8" />
    //       </div>
    //     )}

    //     {!isLoading && (
    //       <div className="flex mt-4">
    //         <ShowMoreText
    //           lines={8}
    //           more="Show more"
    //           less="Show less"
    //           className="w-full text-black mr-24"
    //           anchorClass="text-blue-700 text-base font-bold"
    //           expanded={false}
    //           truncatedEndingComponent={"... "}
    //         >
    //           {bookData?.description}
    //         </ShowMoreText>
    //         <div className="space-y-2">
    //           <div className="flex">
    //             <p className="min-w-44 text-gray-600">Author</p>
    //             <p className="min-w-44 text-black">{bookData?.authorName}</p>
    //           </div>
    //           <div className="flex">
    //             <p className="min-w-44 text-gray-600">Publisher</p>
    //             <p className="min-w-44 text-black">{bookData?.publisherName}</p>
    //           </div>
    //           <div className="flex">
    //             <p className="min-w-44 text-gray-600">Publication date</p>
    //             <p className="min-w-44 text-black">
    //               {bookData?.publicationDay}/{bookData?.publicationMonth}/
    //               {bookData?.publicationYear}
    //             </p>
    //           </div>
    //           <div className="flex">
    //             <p className="min-w-44 text-gray-600">Weight</p>
    //             <p className="min-w-44 text-black">
    //               {bookData?.itemWeight} pound
    //             </p>
    //           </div>
    //           <div className="flex">
    //             <p className="min-w-44 text-gray-600">Language</p>
    //             <p className="min-w-44 text-black">English</p>
    //           </div>
    //           <div className="flex">
    //             <p className="min-w-44  text-gray-600">Format</p>
    //             <p className="min-w-44 text-black">{bookData?.formatName}</p>
    //           </div>
    //           <div className="flex">
    //             <p className="min-w-44 text-gray-600">Dimensions </p>
    //             <p className="min-w-44 text-black">{bookData?.dimensions}</p>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </Container>
    //   <Container>
    //     <p className="heading-4">Product Rating</p>
    //     {reviewIsLoading && (
    //       <div className="w-full flex item-centers py-8 justify-center">
    //         <BeatLoader color="#3F83F8" />
    //       </div>
    //     )}
    //     {!reviewIsLoading && (
    //       <>
    //         <div className=" border-b-1 border-gray-200 pb-4 mb-4">
    //           <div className="flex">
    //             <RatingStar initialRating={bookData?.averageRating} readonly />
    //             <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
    //               {bookData?.averageRating} out of 5
    //             </p>
    //           </div>
    //           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
    //             {bookData?.ratingsCount} global ratings
    //           </p>
    //           {reviewData?.data && (
    //             <div className="mt-4">
    //               <Rating.Advanced percentFilled={70} className="mb-2">
    //                 5 star
    //               </Rating.Advanced>
    //               <Rating.Advanced percentFilled={17} className="mb-2">
    //                 4 star
    //               </Rating.Advanced>
    //               <Rating.Advanced percentFilled={8} className="mb-2">
    //                 3 star
    //               </Rating.Advanced>
    //               <Rating.Advanced percentFilled={4} className="mb-2">
    //                 2 star
    //               </Rating.Advanced>
    //               <Rating.Advanced percentFilled={1} className="">
    //                 1 star
    //               </Rating.Advanced>
    //             </div>
    //           )}
    //         </div>
    //         <div className="space-y-2">
    //           {!reviewData?.data && <span>No review</span>}
    //           {reviewData?.data.map((review) => {
    //             return (
    //               <Review
    //                 review={review}
    //                 onDelete={function (review: BookReview): void {
    //                   throw new Error("Function not implemented.");
    //                 }}
    //               />
    //             );
    //           })}
    //         </div>
    //         <div className="flex w-full justify-center mt-2">
    //           {reviewData?.data && (
    //             <Pagination
    //               currentPage={reviewPage}
    //               totalPages={Math.ceil(
    //                 (reviewData?.totalItems ?? 0) / (reviewData?.pageSize ?? 1)
    //               )}
    //               onPageChange={() => {}}
    //             />
    //           )}
    //         </div>
    //       </>
    //     )}
    //     <ReviewForm bookId={bookData?.id} />
    //   </Container>
    //   <Container className="w-full px-10 py-6 my-8 bg-white rounded-xl">
    //     <p className="heading-4 mb-5">You may like these</p>
    //     {isSimilarLoading && (
    //       <div className="w-full flex item-centers py-8 justify-center">
    //         <BeatLoader color="#3F83F8" />
    //       </div>
    //     )}
    //     {!isSimilarLoading && (
    //       <Slider {...settings}>
    //         {similarBooksQueries.map((res, index) => {
    //           return (
    //             <Product
    //               title={res.data?.data.title ?? ""}
    //               imageURL={res.data?.data.imageUrl ?? ""}
    //               price={res.data?.data.price ?? 0}
    //               rating={res.data?.data.ratingsCount ?? 0}
    //               discount={res.data?.data.discountPercentage ?? 0}
    //               totalRating={res.data?.data.ratingsCount ?? 0}
    //               id={res.data?.data.id ?? 0}
    //             />
    //           );
    //         })}
    //       </Slider>
    //     )}
    //   </Container>
    // </Fade>
    // h-screen & overflow-hidden for the container
    <div id="product-detail-body" className="flex flex-col gap-3 bg-background">
      <FsLightbox
        type={"image"}
        toggler={toggler}
        sources={[
          "https://cdn0.fahasa.com/media/catalog/product/9/7/9784040743639.jpg",
          "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/__date_a_barrette_date_a_live_fragment_8/2024_06_19_14_51_08_2-390x510.png",
          "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/__date_a_barrette_date_a_live_fragment_8/2024_06_19_14_51_08_1-390x510.png",
          "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
          "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
          "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
        ]}
      />
      <div
        id="product-essential"
        className="flex gap-3 bg-background items-start"
      >
        <div
          id="product-essential-media"
          className="flex flex-col gap-3 bg-white sticky top-8 w-[500px] content-border"
        >
          <img
            src="https://cdn0.fahasa.com/media/catalog/product/9/7/9784040743639.jpg"
            className="w-[450px] h-[450px] object-cover mx-auto cursor-pointer"
            onClick={() => setToggler(!toggler)}
          />

          <div className="flex justify-between px-4">
            {lstImg.slice(0, MAX_DISPLAY_NUM_IMAGE_GALLERY).map((img) => (
              <img
                key={img}
                src={img}
                className="w-[82.4px] h-[82.4px] p-1 hover:border-blue-500 hover:border-1 cursor-pointer rounded-md object-contain"
                onClick={() => setToggler(!toggler)}
              />
            ))}
            <div
              className="justify-center items-center flex bg-[#0D0E0F] opacity-80 text-white font-bold w-[82.4px] h-[82.4px] p-1 hover:border-blue-500 hover:border-1 cursor-pointer rounded-md hover:text-[#F63B2F] "
              onClick={() => setToggler(!toggler)}
            >
              +{lstImg.length - MAX_DISPLAY_NUM_IMAGE_GALLERY}
            </div>
          </div>

          <div id="buying-btn-containers" className="flex flex-row gap-4 px-4">
            <button className="w-full bg-white border-2 rounded-md py-2 font-semibold text-primary border-primary active:scale-95 transition duration-150 ease-in-out">
              <div className="flex w-fit gap-2 items-center mx-auto">
                <PiShoppingCart />
                Add to cart
              </div>
            </button>
            <button className="w-full rounded-md py-2 font-semibold text-white bg-primary active:scale-95 transition duration-150 ease-in-out">
              <div className="flex w-fit gap-2 items-center mx-auto">
                Buy now
              </div>
            </button>
          </div>

          <div id="policies-container" className="flex flex-col gap-4 px-4">
            <h6 className="font-bold">Aoitome Promotional Policies</h6>
            <Policy
              content={{
                label: "Shipping time:",
                content: "Fast and reliable shipping",
              }}
              iconSrc={"icon-delivery"}
            />
            <Policy
              content={{
                label: "Return policy:",
                content: "Free nationwide returns",
              }}
              iconSrc={"icon-product"}
            />
            <Policy
              content={{
                label: "Wholesale policy:",
                content: "Discounts for bulk purchases",
              }}
              iconSrc={"icon-shop"}
            />
          </div>
        </div>
        <div
          id="product-essential-detail"
          className="flex flex-col gap-3 bg-background flex-1 overflow-y-auto"
        >
          <div
            id="product-view"
            className="bg-white flex flex-col p-4 content-border gap-2"
          >
            <span className="break-words text-2xl font-semibold">
              デート・ア・ライブ フラグメント デート・ア・バレット - Date A
              Barrette Date A Live Fragment 8
            </span>
            <div id="product-sa" className="flex flex-col text-sm gap-2">
              <div className="flex flex-1 flex-row">
                <div id="product-sa-supplier" className=" w-2/3">
                  <span className="font-normal">Supplier: </span>
                  <span className="font-bold text-primary">
                    Kinokuniya Book Stores
                  </span>
                </div>
                <div id="product-sa-supplier" className=" w-1/3">
                  <span className="font-normal">Author: </span>
                  <span className="font-bold text-primary">
                    東出 祐一郎, 橘 公
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-row">
                <div id="product-sa-supplier" className="w-2/3">
                  <span className="font-normal">Publisher: </span>
                  <span className="font-bold text-primary ">Kadokawa</span>
                </div>
                <div id="product-sa-supplier" className="w-1/3">
                  <span className="font-normal">Book layout: </span>
                  <span className="font-bold text-primary">Paperback</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 mb-1">
              <RatingStar />
              <div className="w-px h-full bg-black"></div>
              <span className="text-sm font-medium text-gray-900">
                Sold quantity 51
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="line-clamp-2 cursor-pointer h-fit text-primary text-md leading-normal text-3xl font-semibold">
                8.24$
              </div>
              <div className="text-gray-400 text-lg font-normal line-through leading-tight">
                12.9$
              </div>
              <span className="bg-blue-700  text-white text-lg px-2 py-1 font-bold rounded-md">
                -25%
              </span>
            </div>
          </div>
          <div
            id="info-delivery"
            className="bg-white flex flex-col flex-1 p-4 content-border gap-2"
          >
            <span className="font-bold heading-6">Shipping details</span>
            <div id="shipping-address" className="flex flex-row gap-4 text-sm">
              <span>
                Delivery to <strong>YOUR_ADDRESS</strong>
              </span>
              <button className="font-bold text-primary border-0 bg-transparent">
                Change
              </button>
            </div>
            <div id="shipping-method" className="flex flex-row gap-4">
              <div className="bg-[#14ab77] text-[#14ab77] w-5 h-5 icon-shipping svg-icon select-none cursor-auto">
                abcxyz
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-md">Standard delivery</span>
                <span className="text-sm">
                  Expected delivery <strong>Saturday - 10-12</strong>
                </span>
              </div>
            </div>
            <div id="rel-discounts-header" className="flex flex-row gap-4">
              <span className="font-bold heading-6">Related promotions</span>
              <button className="font-bold text-primary border-0 bg-transparent text-sm">
                See more{" "}
              </button>
            </div>
            <div id="rel-discount-list" className="flex flex-row gap-4">
              <Coupon />
              <Coupon />
              <Coupon />
              <Coupon />
            </div>
            <div
              id="quantity-input-container"
              className="flex flex-row gap-16 mt-2 items-center"
            >
              <span className="heading-6 font-bold">Quantity</span>
              <QuantityInput quantity={0} onQuantityChange={undefined} />
            </div>
          </div>
          <div
            id="info-detail-1"
            className="bg-white content-border flex flex-col p-4"
          >
            <span className="font-bold heading-6 pb-4">
              Product description
            </span>
            <div className="w-full flex flex-col">
              {titles.map((item: string, index) => (
                <div key={index} className="py-2">
                  <div className="w-full flex font-light text-sm">
                    <div className="w-1/4 text-[#777777]">{item}</div>
                    <div className="w-3/4">{"Test input"}</div>
                  </div>
                  {index < titles.length - 1 && (
                    <hr className="w-full border-t border-background mt-2" />
                  )}{" "}
                  {/* Horizontal separator */}
                </div>
              ))}
            </div>
          </div>
          <div
            id="info-detail-2"
            className="bg-white p-4 content-border flex flex-col"
          >
            <span className="heading-6 font-bold pb-4">
              Product description
            </span>

            <div
              className={`leading-8 grid overflow-hidden grid-transition-rows delay-1000 ${
                toggleDescr ? "grid-rows-[1fr]" : "grid-rows-[200px]"
              } `}
            >
              <div>
                <strong>
                  デート・ア・ライブ フラグメント デート・ア・バレット - Date A
                  Bullet Date A Live Fragment 8
                </strong>
                <br />
                &nbsp;さあ――わたくしの戦争も終わらせましょう
                <br />
                「さて、それじゃあ……死にますか!」
                大切な人を応援するため、自らを犠牲にする少女。
                <br />
                「それでは紗和さん。最後のデートを始めましょう」
                好きな人と再会するため、走り続ける少女。
                <br />
                「世界が滅んでもいい。あなたが滅ぶなら構わない」
                親しい人を独占するため、隣界を滅ぼそうとする少女。
                <br />
                ついに辿り着いた第一領域にて、緋衣響、時崎狂三、白の女王の殺し合いは終わりを迎える。
                <br />
                戦い続けた少女たちが下す選択とは――。「長い時間が掛かりましたけど。ちゃんと、叶いましたわ」
                <br />
                時崎狂三のもうひとつの戦争、ここに完結!
              </div>
              <div
                className={`${
                  toggleDescr
                    ? "h-0"
                    : "sticky bottom-0 left-0 w-full h-[200px] white-gradient"
                } transition-height duration-1000 ease 
`}
              ></div>
            </div>
            <div className="text-center pt-2">
              <a
                className="w-full text-center text-primary border-0 bg-transparent cursor-pointer font-medium"
                onClick={() => setToggleDescr(!toggleDescr)}
              >
                {toggleDescr ? "View less" : "View more"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id="related-products"
        className="flex flex-col gap-4 bg-white p-4 content-border"
      >
        <span className="heading-6 font-bold">Related Products</span>
        <nav id="tag-products" className="flex gap-4 ">
          <a href="#">Same authors</a>
          <a href="#">Same waifus</a>
        </nav>
        <div className="tag-products-view flex flex-row justify-between">
          {KurumiList.slice(0, 5).map((product, index) => (
            <Product
              key={index}
              title={product.title}
              imageURL={product.imageURL}
              price={product.price}
              rating={product.rating}
              discount={product.discount}
              totalRating={product.totalRating}
              id={0}
            />
          ))}
        </div>
      </div>
      <div
        id="recommendation"
        className="flex flex-col gap-4 bg-white p-4 content-border"
      >
        <span className="heading-6 font-bold">Recommendations</span>
        <div className="tag-products-view flex flex-row justify-between">
          {KurumiList.slice(0, 5).map((product, index) => (
            <Product
              key={index}
              title={product.title}
              imageURL={product.imageURL}
              price={product.price}
              rating={product.rating}
              discount={product.discount}
              totalRating={product.totalRating}
              id={0}
            />
          ))}
        </div>
      </div>
      <div id="rating-product-view" className=" items-center p-4 content-border bg-white">
        <span className="heading-6 font-bold">Product reviews</span>
        <div
          id="rating-header"
          className="flex flex-row my-4"
        >
          <div id="rating-chart" className="w-1/2">
            <div className="flex flex-row w-full gap-8">
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <span className="text-4xl font-bold text-black">4.95</span> &nbsp;
                  <span className="text-2xl font-semibold text-black">/&nbsp;5</span>
                </p>
                <Rating className="mb-2 justify-center">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  1,745 global ratings
                </p>
              </div>
              <div className="flex flex-col flex-1">
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
                <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
              </div>
            </div>
          </div>
          <button
            id="btn-comment"
            className="h-fit mx-auto my-auto p-2 flex  items-center gap-2 w-fit bg-white border-2 rounded-md py-2 font-semibold text-primary border-primary active:scale-95 transition duration-150 ease-in-out"
          >
            <PiNotePencilBold />
            Write comment
          </button>
          
        </div>
        <nav id="tag-reviews" className="flex gap-4 mb-4">
          <a href="#">Newest</a>
          <a href="#">Most reacted</a>
        </nav>
        <hr className="w-full mb-4 border-t border-gray-200" />
        <div id="comment-list" className="flex flex-col gap-4">
          <div id="comment" className="flex items-start gap-4">
            <div id="user-info" className="flex flex-col w-[200px]">
              <span>User</span>
              <span>12/10/2024</span>
            </div>
            <div
              id="comment-detail"
              className="flex flex-col flex-1"
            >
              <div id="rating-point">
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
              <div id="comment-description">I love Fugue & Tingyun</div>
              <div
                id="rating-action"
                className="flex flex-row items-center gap-2"
              >
                <div id="like" className="flex flex-row gap-2 items-center">
                  <PiThumbsUp />
                  Like (0)
                </div>
                <div id="report" className="flex flex-row items-center gap-2">
                  <PiWarningCircleLight />
                  Report
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full border-t border-gray-200" />
          <div id="comment" className="flex items-start gap-4">
            <div id="user-info" className="flex flex-col w-[200px]">
              <span>User</span>
              <span>12/10/2024</span>
            </div>
            <div
              id="comment-detail"
              className="flex flex-col flex-1"
            >
              <div id="rating-point">
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
              <div id="comment-description">I love Fugue & Tingyun</div>
              <div
                id="rating-action"
                className="flex flex-row items-center gap-2"
              >
                <div id="like" className="flex flex-row gap-2 items-center">
                  <PiThumbsUp />
                  Like (0)
                </div>
                <div id="report" className="flex flex-row items-center gap-2">
                  <PiWarningCircleLight />
                  Report
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
