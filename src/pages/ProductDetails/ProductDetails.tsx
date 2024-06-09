import cartApi from "@/apis/cart.api";
import productApi from "@/apis/product.api";
import { Product } from "@/components/Product/Product";
import SizeSelector from "@/components/SizeSelector/SizeSelector";
import { CreateCartItemDTO } from "@/types/CartItems/CreateCartItemDto.type";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { Button, Rating } from "flowbite-react";
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
import Container from "../../components/Container";
import QuantityInput from "../../components/QuantityInput";
import RatingStar from "../../components/RatingStar";
import Review from "../../components/Review";

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
  const id = useParams().id;
  console.log(id);
  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", useParams().id],
    queryFn: async () => {
      var res = await productApi.getProductById(id);
      return res.data;
    },
  });

  const uid = getUIDFromLS();

  const addToCartMutation = useMutation({
    mutationFn: async (body: CreateCartItemDTO) => {
      await cartApi.upsertCartItems(uid, body);
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      productItemId: productData?.items[currentItem].id,
      count: 1,
    });
    toast.success("Item added to cart");
  };

  const [quantity, setQuantity] = useState(1);
  const [currentItem, setCurrentItem] = useState(0);

  const { data: recommendedBooks, isLoading: recommendedBooksIsLoading } =
    useQuery({
      queryKey: ["recommendedBooks", id],
      queryFn: async () => {
        if (!id || id === "") {
          toast.error("Book not found");
          return;
        }
        console.log("bookId", id);
        const data = await productApi.getRecommendations(id);
        console.log("data", data);

        return data;
      },
    });

  const similarBooksQueries = useQueries({
    queries: recommendedBooks
      ? recommendedBooks.map((movieId: string) => {
          return {
            queryKey: ["movie", movieId],
            queryFn: () => productApi.getProductById(movieId.toString()),
          };
        })
      : [],
  });

  const isSimilarLoading = similarBooksQueries.some(
    (result) => result.isLoading
  );

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
            <img
              className="w-80 h-96"
              src={productData?.items[currentItem].image}
            />
            <div className="ml-8 w-full">
              <div className="text-2xl font-semibold">{productData?.name}</div>
              <div className="flex mt-3">
                <div className="w-full">
                  <span className="text-black text-sm font-normal">Tag: </span>
                  <span className="text-black text-sm font-bold capitalize">
                    {productData?.items[currentItem].tags}
                  </span>
                </div>
              </div>
              <div className="flex justify-start w-full mt-1">
                <RatingStar
                  initialRating={productData?.averageRating}
                  readonly
                />
                <p className="ml-2 text-xs font-medium leading-5">
                  {productData?.averageRating}
                </p>
                <p className="text-xs ml-1 font-semibold text-black underline leading-5">
                  {productData?.ratingCount} reviews
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-yellow-600 text-3xl font-bold">
                  {(productData?.items[currentItem].price ?? 0) *
                    (1 -
                      (productData?.items[currentItem].discountPercentage ??
                        0))}{" "}
                  $
                </span>
                <span className="text-black text-sm font-normal line-through ml-3">
                  {productData?.items[currentItem].price?.toFixed(2)} $
                </span>
                <div className="w-11 h-5 px-1.5 ml-3 bg-yellow-600 rounded justify-center items-center gap-2.5 inline-flex">
                  <span className="text-white text-xs font-bold">
                    -
                    {(
                      productData?.items[currentItem].discountPercentage ??
                      0 * 100
                    ).toFixed()}
                    %
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
                      <button className="text-yellow-600 ">Change</button>
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
              <div className="mt-5">
                <SizeSelector
                  sizes={
                    productData?.items.map((item, index) => {
                      return {
                        size: index,
                        available: 10,
                      };
                    }) ?? []
                  }
                  selectedSize={currentItem}
                  onSizeSelect={(size) => setCurrentItem(size)}
                />
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
                  className="w-36 border-1 border-yellow-600"
                  onClick={handleAddToCart}
                >
                  <TbShoppingCartPlus
                    size={16}
                    className="mr-2 text-yellow-600"
                  />
                  <span className="text-yellow-600">Add to cart</span>
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
        <p className="heading-4">Product Description</p>
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
              anchorClass="text-yellow-600 text-base font-bold"
              expanded={false}
              truncatedEndingComponent={"... "}
            >
              {productData?.items[currentItem].description}
            </ShowMoreText>
            <div className="space-y-2">
              <div className="flex">
                <p className="min-w-44 text-gray-600">Reference weight</p>
                <p className="min-w-44 text-black">4.86674 carats</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Material purity</p>
                <p className="min-w-44 text-black">5850</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Primary stone type</p>
                <p className="min-w-44 text-black">Diamond</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Primary stone size</p>
                <p className="min-w-44 text-black">3.2mm</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Number of stones</p>
                <p className="min-w-44 text-black">1 stone</p>
              </div>
              <div className="flex">
                <p className="min-w-44  text-gray-600">Cut</p>
                <p className="min-w-44 text-black">Facet</p>
              </div>
              <div className="flex">
                <p className="min-w-44 text-gray-600">Gender </p>
                <p className="min-w-44 text-black">Female</p>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Container>
        <p className="heading-4">Product Rating</p>
        <div className=" border-b-1 border-gray-200 pb-4 mb-4">
          <div className="flex">
            <RatingStar initialRating={productData?.averageRating} readonly />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {productData?.averageRating} out of 5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {productData?.ratingsCount} global ratings
          </p>
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
        </div>
        <div className="space-y-2">
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </Container>
      <Container className="w-full px-10 py-6 my-8 bg-white rounded-xl">
        <div className="heading-4">You may also like</div>
        {!isSimilarLoading && (
          <Slider {...settings}>
            {similarBooksQueries.map((product, index) => {
              return (
                <Product
                  title={product.data?.data.name}
                  imageURL={product.data?.data.items[0].image}
                  price={product.data?.data.items[0].price}
                  rating={product.data?.data.averageRating}
                  totalRating={product.data?.data.ratingCount}
                />
              );
            })}
          </Slider>
        )}
      </Container>
    </Fade>
  );
}
