import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";

interface ProductProps {
  id: number;
  title: string;
  imageURL: string;
  price: number;
  discount?: number;
  rating: number;
  totalRating: number;
  isAdmin?: boolean;
}

export function Product(props: ProductProps) {
  return (
    <div className="w-52 h-[22rem] pb-1 bg-white rounded-xl shadow border border-gray-200 flex-col justify-start items-center gap-2.5 hover:shadow-lg inline-flex">
      <Link
        to={
          props.isAdmin === true
            ? `product/${props.id}`
            : `/product/${props.id}`
        }
      >
        <img
          className="w-48 h-52 rounded-xl cursor-pointer object-contain	"
          src={props.imageURL}
        />
      </Link>
      <div className="px-1">
        <Link
          to={
            props.isAdmin === true
              ? `admin/product/${props.id}`
              : `/product/${props.id}`
          }
        >
          <div className="line-clamp-2 cursor-pointer h-12 text-black text-base font-normal leading-normal">
            {props.title}
          </div>
        </Link>
        <div className="flex items-center">
          <div className=" text-blue-700 text-base font-bold leading-loose">
            {!props.discount
              ? props.price.toLocaleString()
              : (props.price * props.discount).toFixed(2)}{" "}
            $
          </div>
          {props.discount && (
            <div className="w-11 h-5 px-1.5 ml-3 bg-blue-700 rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-xs font-bold">
                -{(props.discount * 100).toFixed()}%
              </div>
            </div>
          )}
        </div>
        {props.discount && (
          <div className="text-black text-sm font-normal line-through leading-tight">
            {props.price.toLocaleString()}
          </div>
        )}
        {!props.discount && <div className="h-4"></div>}
        <div className="flex justify-start w-full">
          <RatingStar initialRating={5} readonly />
          <p className="ml-2 text-xs font-medium leading-5">
            {props.rating.toFixed(1)}
          </p>
          <p className="text-gray-500 text-xs font-normal leading-5">
            ({props.totalRating})
          </p>
        </div>
      </div>
    </div>
  );
}
