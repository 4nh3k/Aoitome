import catalogApi from "@/apis/catalog.api";
import productApi from "@/apis/product.api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { couponList } from "../../assets/mockdata";
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
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      var res = await catalogApi.getCategories();
      return res.data.result;
    },
  });

  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      var res = await productApi.getAllProducts(0, 10);
      return res.data.result;
    },
  });

  return (
    <>
      <img
        className="rounded-xl"
        src="https://cdn.pnj.io/images/promo/205/tabsale-chung-t4-24-1972x640CTA.jpg"
      />
      <div className="flex justify-between items-center mt-8">
        {couponList.map((coupon) => (
          <img className="h-36 w-72" src={coupon.imageURL} />
        ))}
      </div>
      <Container>
        <div className="heading-4">Categories</div>
        <div className="flex justify-between w-full items-center mt-5 mb-8">
          {categoryLoading && <div>Loading...</div>}
          {!categoryLoading &&
            categoryData?.data.map((category) => (
              <Category title={category.name} imageURL={category.image} />
            ))}
        </div>
      </Container>
      <Container className="w-full px-10 py-6 my-8 bg-white rounded-xl">
        <div className="heading-4">On Sale</div>
        {productLoading && <div>Loading...</div>}
        {!productLoading && (
          <Slider {...settings}>
            {productData?.map((product) => (
              <Product
                title={product.name}
                imageURL={product.items[0].image}
                price={product.items[0].price}
                rating={product.averageRating}
                discount={product.items[0].discountPercentage}
                totalRating={product.ratingCount}
                id={product.id}
              />
            ))}
          </Slider>
        )}
      </Container>
      <Container>
        <div className="heading-4">Trending</div>
        <div className="grid grid-cols-5 gap-4 px-4 mt-5">
          {productLoading && <div>Loading...</div>}
          {!productLoading &&
            productData?.map((product) => (
              <Product
                title={product.name}
                imageURL={product.items[0].image}
                price={product.items[0].price}
                rating={product.averageRating}
                discount={product.items[0].discountPercentage}
                totalRating={product.ratingCount}
                id={product.id}
              />
            ))}
        </div>
        <Button
          className="mt-5 border-yellow-500 border-1 mx-auto"
          outline
          color="cyan"
        >
          <span className="text-yellow-500">View More</span>
        </Button>
      </Container>
    </>
  );
}
