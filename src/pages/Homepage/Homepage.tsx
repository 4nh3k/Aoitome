import { Button } from "flowbite-react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CategoryList, ProductList, couponList } from "../../assets/mockdata";
import Category from "../../components/Category";
import Container from "../../components/Container";
import Product from "../../components/Product";

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

export default function Homepage() {
  return (
    <>
      <img className="rounded-xl" src="/src/assets/img/banner.png" />
      <div className="flex justify-between items-center mt-8">
        {couponList.map((coupon) => (
          <img src={coupon.imageURL} />
        ))}
      </div>
      <Container>
        <div className="heading-4">Categories</div>
        <div className="flex justify-between w-full items-center mt-5">
          {CategoryList.map((category) => (
            <Category title={category.title} imageURL={category.imageURL} />
          ))}
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
      <Container>
        <div className="heading-4">Trending</div>
        <div className="grid grid-cols-5 gap-4 px-4 mt-5">
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
        </div>
        <Button
          className="mt-5 border-blue-600 border-1 mx-auto"
          outline
          color="cyan"
        >
          <span className="text-blue-600">View More</span>
        </Button>
      </Container>
    </>
  );
}
