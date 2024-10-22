import { bookApi } from "@/apis/book.api";
import { bookReviewApi } from "@/apis/bookReview.api";
import { recsysApi } from "@/apis/recsys.api";
import { Product } from "@/components/Product/Product";
import ReviewForm from "@/pages/UserReview/ReviewForm";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button, Modal, Pagination, Rating } from "flowbite-react";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import {
  PiCaretLeft,
  PiCaretRight,
  PiThumbsUp,
  PiWarningCircleLight,
} from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { cartApi } from "@/apis/cart.api";
import RatingStar from "@/components/RatingStar";
import useBookDetails from "@/hooks/useBookDetails";
import { getUIDFromLS } from "@/utils/auth";
import { KurumiList } from "@/assets/mockdata";
import { PiNotePencilBold, PiShoppingCart } from "react-icons/pi";
import FsLightbox from "fslightbox-react";
import {} from "react-icons/pi";
import Policy from "@/components/Policy/Policy";
import TabSlider from "@/components/TabSlider/TabSlider";
import Comment from "@/components/Comment/Comment";
import EditReviewForm from "../UserReview/EditReviewForm";

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
  const MAX_DISPLAY_NUM_IMAGE_GALLERY = 4;
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
      ? recommendedBooks.map((bookId: number) => {
          return {
            queryKey: ["book-recommends", bookId],
            queryFn: () => bookApi.getBook(bookId.toString()),
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
          selected: false,
        });
        console.log("cartData", cartData);
      }
      console.log("cartData", cartData);
      await cartApi.updateCart(uid, items);
      toast.success("Add to cart successfully");
      queryClient.invalidateQueries(["cart", uid]);
    },
  });
  // Create Title and Description Lists
  const productDetailHeaders = [
    { dataIndex: "id", label: "Product code" },
    { dataIndex: "languageCode", label: "Language code" },
    { dataIndex: "numPages", label: "Number of pages" },
    { dataIndex: "publicationDate", label: "Publication date" },
    { dataIndex: "title", label: "Title" },
    { dataIndex: "availability", label: "Availability" },
    { dataIndex: "dimensions", label: "Dimensions" },
    { dataIndex: "itemWeight", label: "Item Weight" },
    { dataIndex: "authorName", label: "Author" },
    { dataIndex: "genres", label: "Genres" }, // Assuming Genre is defined as a type/interface
    { dataIndex: "formatName", label: "Format" },
    { dataIndex: "publisherName", label: "Publisher" },
  ];

  // const filters = ["Same author", "Same genres"];
  const filters = ["Same author"];
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [params, setParams] = useState({
    pageIndex: 0,
    pageSize: 5,
    genreIds: [],
    authorName: bookData?.authorName,
  });

  const { data: searchBook, isLoading: isLoadingSearchBook } = useQuery({
    queryKey: ["filter", params],
    queryFn: async () => {
      const res = await bookApi.getFilterBookByPage(
        params.pageIndex,
        params.pageSize,
        params.genreIds,
        params.authorName
      );
      return res.data;
    },
  });
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    addToCartMutation.mutate(bookData?.id);
    console.log("Buy now clicked !");
    navigate(`/cart`);
  };

  const { data: userReview, isLoading: isLoadingUserReview } = useQuery({
    queryKey: ["user-review", id, uid],
    queryFn: async () => {
      const res = await bookReviewApi.getBookReviews(
        id,
        uid,
        params.pageIndex,
        params.pageSize
      );
      return res.data;
    },
  });

  const [isUserReviewExist, setIsUserReviewExist] = useState(false);

  useEffect(() => {
    if (
      userReview?.totalItems !== undefined &&
      userReview?.totalItems !== null &&
      userReview.totalItems > 0
    ) {
      setIsUserReviewExist(true);
    }
  }, [isLoadingUserReview]);

  const [isAddReviewModalOn, setIsReviewModalOn] = useState(false);
  const [isEditReviewModalOn, setIsEditReviewModalOn] = useState(false);

  const toggleReviewModal = () => {
    if (isUserReviewExist) {
      toggleEditReviewModal(!isAddReviewModalOn);
    } else {
      toggleAddReviewModal(!isEditReviewModalOn);
    }
  };

  const toggleAddReviewModal = (value: boolean) => {
    setIsReviewModalOn(value);
  };

  const toggleEditReviewModal = (value: boolean) => {
    setIsEditReviewModalOn(value);
  };

  const lstImg = [
    "https://cdn0.fahasa.com/media/catalog/product/9/7/9784040743639.jpg",
    "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/__date_a_barrette_date_a_live_fragment_8/2024_06_19_14_51_08_2-390x510.png",
    "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/__date_a_barrette_date_a_live_fragment_8/2024_06_19_14_51_08_1-390x510.png",
    "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
    "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
    "https://cdn0.fahasa.com/media/catalog/product/_/_/__date_a_barrette_date_a_live_fragment_8_1_2024_06_19_14_51_08.jpg",
  ];

  const [toggler, setToggler] = useState(false);
  const [toggleDescr, setToggleDescr] = useState(true);

  return (
    <Fade triggerOnce={true}>
      {isLoading && (
        <div className="w-full flex item-centers py-40 justify-center">
          <BeatLoader color="#3F83F8" />
        </div>
      )}
      {!isLoading && (
        <div
          id="product-detail-body"
          className="flex flex-col gap-3 bg-background"
        >
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
                // src="https://cdn0.fahasa.com/media/catalog/product/9/7/9784040743639.jpg"
                src={bookData?.imageUrl}
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

              <div
                id="buying-btn-containers"
                className="flex flex-row gap-4 px-4"
              >
                <button
                  className="w-full bg-white border-2 rounded-md py-2 font-semibold text-primary border-primary active:scale-95 transition duration-150 ease-in-out"
                  onClick={() => addToCartMutation.mutate(bookData?.id)}
                >
                  <div className="flex w-fit gap-2 items-center mx-auto">
                    <PiShoppingCart />
                    Add to cart
                  </div>
                </button>
                <button
                  className="w-full rounded-md py-2 font-semibold text-white bg-primary active:scale-95 transition duration-150 ease-in-out"
                  onClick={handleBuyNow}
                >
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
                  {/* デート・ア・ライブ フラグメント デート・ア・バレット - Date A
                Barrette Date A Live Fragment 8 */}
                  {bookData?.title}
                </span>
                <div id="product-sa" className="flex flex-col text-sm gap-2">
                  <div className="flex flex-1 flex-row">
                    <div id="product-sa-supplier" className=" w-2/3">
                      <span className="font-normal">Number of pages: </span>
                      <span className="font-bold text-primary">
                        {/* Kinokuniya Book Stores */}
                        {bookData?.numPages}
                      </span>
                    </div>
                    <div id="product-sa-supplier" className=" w-1/3">
                      <span className="font-normal">Author: </span>
                      <span className="font-bold text-primary">
                        {/* 東出 祐一郎, 橘 公 */}
                        {bookData?.authorName}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-row">
                    <div id="product-sa-supplier" className="w-2/3">
                      <span className="font-normal">Publisher: </span>
                      <span className="font-bold text-primary ">
                        {/* Kadokawa */}
                        {bookData?.publisherName}
                      </span>
                    </div>
                    <div id="product-sa-supplier" className="w-1/3">
                      <span className="font-normal">Book layout: </span>
                      <span className="font-bold text-primary">
                        {bookData?.formatName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 mb-1">
                  <RatingStar
                    productId={bookData?.id ?? 0}
                    readonly={true}
                    initialRating={bookData?.averageRating}
                  />
                  <div className="w-px h-full bg-black"></div>
                  <span className="text-sm font-medium text-primary my-auto">
                    <strong>Sold quantity:</strong> 51
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="line-clamp-2 cursor-pointer h-fit text-primary text-md leading-normal text-3xl font-semibold">
                    {/* 8.24$ */}
                    {(
                      (bookData?.price ?? 0) *
                      (1 - (bookData?.discountPercentage ?? 0))
                    ).toFixed(2)}
                    $
                  </div>
                  <div className="text-gray-400 text-lg font-normal line-through leading-tight">
                    {/* 12.9$ */}
                    {bookData?.price ?? 0}$
                  </div>
                  <span className="bg-blue-700  text-white text-lg px-2 py-1 font-bold rounded-md">
                    {/* -25% */}-
                    {((bookData?.discountPercentage ?? 0) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              {/* <div
              id="info-delivery"
              className="bg-white flex flex-col flex-1 p-4 content-border gap-2"
            >
              <span className="font-bold heading-6">Shipping details</span>
              <div
                id="shipping-address"
                className="flex flex-row gap-4 text-sm"
              >
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
            </div> */}
              <div
                id="info-detail-1"
                className="bg-white content-border flex flex-col p-4"
              >
                <span className="font-bold heading-6 pb-4">
                  Product description
                </span>
                <div className="w-full flex flex-col">
                  {productDetailHeaders.map((item, index) => {
                    let value = "";
                    value = bookData[item.dataIndex];

                    if (item.dataIndex === "publicationDate") {
                      const date = new Date(
                        bookData?.publicationYear ?? 1999,
                        bookData?.publicationMonth !== undefined &&
                        bookData.publicationMonth !== null
                          ? bookData.publicationMonth - 1
                          : 1,
                        bookData?.publicationDay ?? 1
                      ); // Month is zero-indexed
                      // Format the date to a readable string (e.g., "YYYY-MM-DD")
                      const formattedDate = date.toISOString().split("T")[0];
                      console.log(formattedDate);
                      value = formattedDate;
                    }
                    if (item.dataIndex === "genres") {
                      value = "";
                      bookData?.bookGenres.forEach((element, index) => {
                        value += element.name;
                        if (index < bookData.bookGenres.length - 1)
                          value += ", ";
                      });
                    }
                    return (
                      <div key={index} className="py-2">
                        <div className="w-full flex font-light text-sm">
                          <div className="w-1/4 text-[#777777]">
                            {item.label}
                          </div>
                          <div className="w-3/4">{value}</div>
                        </div>
                        {index < productDetailHeaders.length - 1 && (
                          <hr className="w-full border-t border-background mt-2" />
                        )}{" "}
                        {/* Horizontal separator */}
                      </div>
                    );
                  })}
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
                  class={`grid-rows-transition ${
                    toggleDescr ? "grid-rows-transition-open" : ""
                  }`}
                  // className={`leading-8 grid overflow-hidden relative transition-height duration-300 ease-in-out ${
                  //   toggleDescr ? "max-h-auto" : "max-h-[200px]"
                  // }`}
                >
                  <div id="product-description-text">
                    <strong>
                      {/* デート・ア・ライブ フラグメント デート・ア・バレット -
                      Date A Bullet Date A Live Fragment 8 */}
                      {bookData?.title}
                    </strong>
                    <br />
                    {bookData?.description}
                    {/* <br />
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
                    時崎狂三のもうひとつの戦争、ここに完結! */}
                  </div>
                  <div
                    className={`${
                      toggleDescr
                        ? "h-0"
                        : `bottom-0 left-0 w-full h-[200px] white-gradient`
                    } absolute transition-height duration-1000 ease `}
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
            <TabSlider
              items={filters}
              defaultActive={selectedFilter}
              setSelectedItem={(value) => setSelectedFilter(value)}
            />
            {!isLoadingSearchBook && (
              <Fade triggerOnce={true}>
                <div className="tag-products-view flex flex-row gap-4">
                  {searchBook?.data.map((product) => (
                    <Product
                      id={product.id}
                      key={product.title}
                      title={product.title ?? "N/A"}
                      imageURL={product.imageUrl ?? "N/A"}
                      price={product.price ?? 0}
                      rating={product.averageRating ?? 0}
                      discount={product.discountPercentage ?? 0}
                      totalRating={product.ratingsCount ?? 0}
                    />
                  ))}
                </div>
              </Fade>
            )}
          </div>
          <div
            id="recommendation"
            className="flex flex-col gap-4 bg-white p-4 content-border"
          >
            <span className="heading-6 font-bold">Recommendations</span>
            <Fade triggerOnce={true}>
              <div className="tag-products-view flex flex-row gap-4">
                {similarBooksQueries.slice(0, 6).map((product, index) => (
                  <Product
                    key={index}
                    title={product.data?.data.title ?? "N/A"}
                    imageURL={product.data?.data.imageUrl ?? "N/A"}
                    price={product.data?.data.price ?? 0}
                    rating={product.data?.data.averageRating ?? 0}
                    discount={product.data?.data.discountPercentage ?? 0}
                    totalRating={product.data?.data.ratingsCount ?? 0}
                    id={0}
                  />
                ))}
              </div>
            </Fade>
          </div>
          <div
            id="rating-product-view"
            className=" items-center p-4 content-border bg-white"
          >
            <span className="heading-6 font-bold">Product reviews</span>

            {reviewIsLoading && (
              <div className="w-full flex item-centers py-8 justify-center">
                <BeatLoader color="#3F83F8" />
              </div>
            )}
            {!reviewIsLoading && (
              <Fade triggerOnce={true}>
                <div id="rating-header" className="flex flex-row my-4">
                  <div id="rating-chart" className="w-1/2">
                    <div className="flex flex-row w-full gap-8">
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                          <span className="text-4xl font-bold text-black">
                            {bookData?.averageRating}
                          </span>{" "}
                          &nbsp;
                          <span className="text-2xl font-semibold text-black">
                            /&nbsp;10
                          </span>
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
                        <Rating.Advanced percentFilled={1}>
                          1 star
                        </Rating.Advanced>
                      </div>
                    </div>
                  </div>
                  <button
                    id="btn-comment"
                    className="h-fit mx-auto my-auto p-2 flex  items-center gap-2 w-fit bg-white border-2 rounded-md py-2 font-semibold text-primary border-primary active:scale-95 transition duration-150 ease-in-out"
                    onClick={toggleReviewModal}
                  >
                    <PiNotePencilBold />
                    {isUserReviewExist ? "Edit comment" : "Write comment"}
                  </button>
                  <Modal
                    size={"6xl"}
                    dismissible
                    show={isAddReviewModalOn}
                    onClose={() => toggleAddReviewModal(false)}
                  >
                    <Modal.Header>Add review</Modal.Header>
                    <Modal.Body>
                      <ReviewForm
                        userId={uid ?? ""}
                        bookId={parseInt(id) ?? 0}
                      />
                    </Modal.Body>
                  </Modal>
                  <Modal
                    size={"6xl"}
                    dismissible
                    show={isEditReviewModalOn}
                    onClose={() => toggleEditReviewModal(false)}
                  >
                    <Modal.Header>Edit review</Modal.Header>
                    <Modal.Body>
                      <EditReviewForm
                        userId={uid ?? ""}
                        bookId={parseInt(id) ?? 0}
                        username={userReview?.data[0].username}
                        userProfileImage={userReview?.data[0].userProfileImage}
                        comment={userReview?.data[0].comment}
                        ratingPoint={userReview?.data[0].ratingPoint}
                      />
                    </Modal.Body>
                  </Modal>
                </div>
                <TabSlider items={["Newest"]} setSelectedItem={() => {}} />
                <hr className="w-full mb-4 border-t border-gray-200" />
                <div id="comment-list" className="flex flex-col gap-4">
                  {reviewData?.data.map((review, index) => {
                    if (index < reviewData?.data.length - 1) {
                      return (
                        <>
                          <Comment
                            bookId={parseInt(id) ?? 0}
                            username={review?.username ?? "N/A"}
                            commentDate={
                              review?.creationDate ??
                              new Date().toISOString().split("T")[0]
                            }
                            rating={review?.ratingPoint ?? 0}
                            commentDescr={review?.comment ?? "N/A"}
                          />
                          <hr className="w-full border-t border-gray-200" />
                        </>
                      );
                    } else
                      return (
                        <Comment
                          bookId={parseInt(id) ?? 0}
                          username={review?.username ?? "N/A"}
                          commentDate={
                            review?.creationDate ??
                            new Date().toISOString().split("T")[0]
                          }
                          rating={review?.ratingPoint ?? 0}
                          commentDescr={review?.comment ?? "N/A"}
                        />
                      );
                  })}
                </div>
              </Fade>
            )}
          </div>
        </div>
      )}
    </Fade>
  );
}
