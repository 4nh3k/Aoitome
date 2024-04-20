import { Button, Pagination, Rating } from "flowbite-react";
import { useState } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { TbShoppingCartPlus } from "react-icons/tb";
import ShowMoreText from "react-show-more-text";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ProductList } from "../../assets/mockdata";
import Container from "../../components/Container";
import Gallery from "../../components/Gallery/Gallery";
import Product from "../../components/Product";
import QuantityInput from "../../components/QuantityInput";
import RatingStar from "../../components/RatingStar";
import Review from "../../components/Review";
import SizeSelector, {
  RingSize,
} from "../../components/SizeSelector/SizeSelector";

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
const sizes: RingSize[] = [
  { size: 6, available: true },
  { size: 7, available: false },
  { size: 8, available: true },
  { size: 9, available: true },
];

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const onSizeSelect = (size: number) => {
    setSelectedSize(size);
    console.log("test");
  };
  return (
    <div>
      <Container>
        <div className="flex px-2">
          {/* gallery lamf sau*/}
          <Gallery />
          {/* <img
            className="w-80 h-96"
            src="https://via.placeholder.com/336x465"
          /> */}
          <div className="ml-8">
            <div className="text-2xl font-semibold">
              Diamond Wedding Ring crafted from 18K gold|PNJ Sleeping Beauty
              DDDDC001273
            </div>
            <div className="flex mt-3">
              <div className="w-1/2">
                <span className="text-black text-sm font-normal">Code: </span>
                <span className="text-black text-sm font-bold">
                  GNDDDDC001273
                </span>
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
              <span className="text-primary text-3xl font-bold">151.300 đ</span>
              <span className="text-black text-sm font-normal line-through ml-3">
                178.000
              </span>
              <div className="w-11 h-5 px-1.5 ml-3 bg-primary rounded justify-center items-center gap-2.5 inline-flex">
                <span className="text-white text-xs font-bold">-25%</span>
              </div>
            </div>
            <div className="flex mt-3 justify-between w-full items-center">
              <span className="text-black text-sm font-normal">Size: </span>
              <button className="text-black text-xs underline font-normal">
                How to measure your size
              </button>
            </div>
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSizeSelect={onSizeSelect}
            />
            <div className=" flex mt-3 items-start justify-start ">
              <span className="text-black text-sm font-normal w-20">
                Delivery
              </span>
              <div>
                <p className="text-black text-sm font-normal">
                  Deliver to{" "}
                  <b>
                    Bonnie Green- Sacramento 23647{" "}
                    <button className="text-primary ">Change</button>
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
                className="w-36 border-1 border-yellow-500"
              >
                <TbShoppingCartPlus
                  size={16}
                  className="mr-2 text-yellow-500"
                />
                <span className="text-yellow-500">Add to cart</span>
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
            anchorClass="text-primary text-base font-bold"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            Diamonds have always been a symbol of pride and endless fashion
            inspiration. Owning a diamond jewelry piece is something everyone
            desires. A ring crafted from 14K gold, adorned with a perfectly cut
            diamond featuring 57 facets, creates a jewelry piece full of luxury
            and sophistication. While diamonds are beautiful on their own,
            diamond jewelry carries an irresistible allure. This fresh
            combination is sure to make a mark in modern fashion and make the
            wearer stand out, exuding confidence and attracting admiration from
            all around.
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
