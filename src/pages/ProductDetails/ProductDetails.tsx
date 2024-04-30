import { Button, Pagination, Rating } from "flowbite-react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ProductList } from "../../assets/mockdata";
import Container from "../../components/Container";
import Product from "../../components/Product";
import QuantityInput from "../../components/QuantityInput";
import RatingStar from "../../components/RatingStar";
import Review from "../../components/Review";
import useBookDetails from "../../hooks/useBookDetails";

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

  const { getBookDetails } = useBookDetails(id || "");
  const { data: bookData, isLoading } = getBookDetails;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Container>
        <div className="flex px-2">
          <img className="w-80 h-96" src={bookData?.imageUrl} />
          <div className="ml-8 w-full">
            <div className="text-2xl font-semibold">{bookData?.title}</div>
            <div className="flex mt-3">
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">
                  Provider:{" "}
                </span>
                <span className="text-black text-sm font-bold">
                  Cambridge University Press
                </span>
              </div>
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">Author: </span>
                <span className="text-black text-sm font-bold">
                  {bookData?.authorName}
                </span>
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">
                  Publisher:{" "}
                </span>
                <span className="text-black text-sm font-bold">
                  {bookData?.publisherName}
                </span>
              </div>
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">Format: </span>
                <span className="text-black text-sm font-bold">
                  {bookData?.formatName}
                </span>
              </div>
            </div>
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
                {(bookData?.price * (1 - bookData?.discountPercentage)).toFixed(
                  2
                )}{" "}
                $
              </span>
              <span className="text-black text-sm font-normal line-through ml-3">
                {bookData?.price.toFixed(2)} $
              </span>
              <div className="w-11 h-5 px-1.5 ml-3 bg-blue-700 rounded justify-center items-center gap-2.5 inline-flex">
                <span className="text-white text-xs font-bold">
                  -{bookData?.discountPercentage * 100}%
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
              <QuantityInput />
            </div>
            <div className="flex mt-5 items-center justify-start ">
              <Button
                size="sm"
                outline
                color="cyan"
                className="w-36 border-1 border-blue-600"
              >
                <TbShoppingCartPlus size={16} className="mr-2 text-blue-600" />
                <span className="text-blue-600">Add to cart</span>
              </Button>
              <Button size="sm" className="ml-6 w-36">
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <p className="heading-4">Product Desciption</p>
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
      </Container>
      <Container>
        <p className="heading-4">Product Rating</p>
        <div className=" border-b-1 border-gray-200 pb-4 mb-4">
          <div className="flex">
            <RatingStar initialRating={5} readonly />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              5 out of 5
            </p>
          </div>
          <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            1,745 global ratings
          </p>
          {/* Todo change this shit to yellow 300 */}
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
        <div className="space-y-2">
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
        <div className="flex w-full justify-center mt-2">
          <Pagination
            currentPage={1}
            totalPages={100}
            onPageChange={() => {}}
          />
        </div>
      </Container>
      <Container className="w-full px-10 py-6 my-8 bg-white rounded-xl">
        <div className="heading-4">On Sale</div>
        <Slider {...settings}>
          {ProductList.map((product) => (
            <Product
              title={product.title}
              imageURL={product.imageURL}
              price={product.price}
              rating={product.rating}
              discount={product.discount}
              totalRating={product.totalRating}
            />
          ))}
        </Slider>
      </Container>
    </div>
  );
}
