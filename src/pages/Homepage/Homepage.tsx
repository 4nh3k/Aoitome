import { CategoryList, couponList } from "../../assets/mockdata";
import Category from "../../components/Category";
import Container from "../../components/Container";
import Product from "../../components/Product";

export default function Homepage(props) {
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
        <Product />
      </Container>
    </>
  );
}
