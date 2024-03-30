import { Button, Pagination, Rating } from "flowbite-react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { TbShoppingCartPlus } from "react-icons/tb";
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
  return (
    <div>
      <Container>
        <div className="flex px-2">
          {/* gallery lamf sau*/}
          <img
            className="w-80 h-96"
            src="https://via.placeholder.com/336x465"
          />
          <div className="ml-8">
            <div className="text-2xl font-semibold">
              Essential Grammar in Use Book with Answers Fahasa Reprint Edition:
              A Self-Study Reference and Practice Book for Elementary Learners
              of English
            </div>
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
                  Raymond Murphy
                </span>
              </div>
            </div>
            <div className="flex mt-1">
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">
                  Publisher:{" "}
                </span>
                <span className="text-black text-sm font-bold">
                  Cambridge University
                </span>
              </div>
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">Format: </span>
                <span className="text-black text-sm font-bold">Hardcover</span>
              </div>
            </div>
            <div className="flex justify-start w-full mt-1">
              <RatingStar initialRating={5} readonly />
              <p className="ml-2 text-xs font-medium leading-5">(5)</p>
              <p className="text-xs ml-1 font-semibold text-black underline leading-5">
                200 reviews
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-blue-700 text-3xl font-bold">
                151.300 đ
              </span>
              <span className="text-black text-sm font-normal line-through ml-3">
                178.000
              </span>
              <div className="w-11 h-5 px-1.5 ml-3 bg-blue-700 rounded justify-center items-center gap-2.5 inline-flex">
                <span className="text-white text-xs font-bold">-25%</span>
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
            Essential Grammar in Use is a self-study reference and practice book
            for elementary-level learners (A1-B1), used by millions of people
            around the world. With clear examples, easy-to-follow exercises and
            answer key, the Fourth edition is perfect for independent study,
            covering all the areas of grammar that you will need at this level.
            The book has an easy-to-use format of two-page units with clear
            explanations of grammar points on the left-hand page, and practice
            exercises on the right. It also includes plenty of additional
            exercises and a Study Guide to help you find the grammar units you
            need to study.
          </ShowMoreText>
          <div className="space-y-2">
            <div className="flex">
              <p className="min-w-44 text-gray-600">Author</p>
              <p className="min-w-44 text-black">Raymond Murphy</p>
            </div>
            <div className="flex">
              <p className="min-w-44 text-gray-600">Publisher</p>
              <p className="min-w-44 text-black">Cambridge University</p>
            </div>
            <div className="flex">
              <p className="min-w-44 text-gray-600">Publication date</p>
              <p className="min-w-44 text-black">05/11/2017</p>
            </div>
            <div className="flex">
              <p className="min-w-44 text-gray-600">Weight</p>
              <p className="min-w-44 text-black">500g</p>
            </div>
            <div className="flex">
              <p className="min-w-44 text-gray-600">Language</p>
              <p className="min-w-44 text-black">English</p>
            </div>
            <div className="flex">
              <p className="min-w-44  text-gray-600">Format</p>
              <p className="min-w-44 text-black">Hardcover</p>
            </div>
            <div className="flex">
              <p className="min-w-44 text-gray-600">Dimensions </p>
              <p className="min-w-44 text-black">26.2 x 19.5</p>
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
