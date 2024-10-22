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
    <div
      className="w-52 p-4 h-fit bg-white 
    rounded-md border-none border-gray-200 flex-col justify-start items-center gap-2.5 hover:shadow-custom-lg hover:shadow-slate-300 inline-flex box-border"
    >
      <Link
        to={
          props.isAdmin === true
            ? `${props.id}`
            : `/product/${props.id}`
        }
        replace={true}
      >
        <img
          className="w-48 h-52 rounded-xl cursor-pointer object-contain	"
          src={props.imageURL}
        />
      </Link>
      <div className="px-2 h-full flex flex-col gap-1">
        <Link
          to={
            props.isAdmin === true
              ? `${props.id}`
              : `/product/${props.id}`
          }
          replace={true}
        >
          <div className="line-clamp-2 cursor-pointer h-12 text-black text-md font-normal leading-normal">
            {props.title}
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <div className=" text-blue-700 text-md font-bold leading-loose">
            {!props.discount
              ? props.price
              : ((props.price * (1- props.discount))).toFixed(2)}{" "}
            $
          </div>
          {props.discount && (
            <span className="bg-blue-700  text-white text-xs px-1 py-1 font-bold rounded-md">
              -{(props.discount * 100).toFixed(0)}%
            </span>
          )}
        </div>
        {props.discount && (
          <div className="text-black text-sm font-normal line-through leading-tight">
            {props.price.toLocaleString()} $
          </div>
        )}
        {!props.discount && <div className="h-4"></div>}
        {/* <div className="flex justify-between w-full">
          <div className="flex justify-start w-full">
            <RatingStar initialRating={5} readonly />
          </div>
          <p className="ml-2 text-xs font-medium leading-5">
            {props.rating.toFixed(1)}
          </p>
          <p className="text-gray-500 text-xs font-normal leading-5">
            ({props.totalRating})
          </p>
        </div> */}
      </div>
    </div>
  );
}
