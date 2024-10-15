import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import Slider from "react-slick";
import { BeatLoader } from "react-spinners";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { bookApi } from "../../apis/book.api";
import { CategoryList, couponList } from "../../assets/mockdata";
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
  const { data, isLoading } = useQuery({
    queryKey: ["books", 0, 10],
    queryFn: async () => {
      const res = await bookApi.getBookByPage(0, 10);
      return res.data;
    },
  });

  return (
    <>
      <img
        className="rounded-md w-full object-contain"
        src="/src/assets/img/banner.png"
      />
      <div className="flex flex-wrap justify-between items-center mt-8">
        {couponList.map((coupon, index) => (
          <img
            className="w-1/2 lg:w-1/4 rounded-md object-contain"
            key={index}
            src={coupon.imageURL}
          />
        ))}
      </div>
      <Container>
        <div className="heading-4 mb-0">Categories</div>
        <div className="flex flex-col w-full self-stretch items-center justify-center">
          <div className={`w-full flex justify-between mt-[1.25rem]`}>
            {CategoryList.map((category, index) => (
              <Category
                key={index}
                title={category.title}
                imageURL={category.imageURL}
              />
            ))}
          </div>
        </div>
      </Container>
      <Container>
        <div className="heading-4">On Sale</div>
        {isLoading && (
          <div className="w-full flex item-centers py-8 justify-center">
            <BeatLoader color="#3F83F8" />
          </div>
        )}
        {!isLoading && (
          <Slider className="appearance-none box-border mx-8 py-2 h-full" {...settings}>
              {data?.data.map((product, index) => (
                <Product
                  id={product.id}
                  key={product.id}
                  title={product.title}
                  imageURL={product.imageUrl}
                  price={product.price}
                  rating={product.averageRating}
                  discount={product.discountPercentage}
                  totalRating={product.ratingsCount}
                />
              ))}
          </Slider>
        )}
      </Container>
      <Container>
        <div className="heading-4">Trending</div>
        {isLoading && (
          <div className="w-full flex item-centers py-8 justify-center">
            <BeatLoader color="#3F83F8" />
          </div>
        )}
        <div className="grid grid-cols-5 gap-4 px-4 mt-5">
          {!isLoading &&
            data?.data.map((product, index) => (
              <Product
                id={product.id}
                key={product.id}
                title={product.title}
                imageURL={product.imageUrl}
                price={product.price}
                rating={product.averageRating}
                discount={product.discountPercentage}
                totalRating={product.ratingsCount}
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
