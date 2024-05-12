import { PiHeart, PiX } from "react-icons/pi";
import Button from "../../Button/Button";
import QuantityInput from "../../QuantityInput";

interface CartProductProps {
  imageURL: string;
  title: string;
  price: number;
}

export function CartProduct({ imageURL, title, price }: CartProductProps) {
  // TODO: Add checkbox for selecting product

  return (
    <div className="h-32 w-full px-5 py-3.5 bg-white rounded border border-gray-200 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-2.5 flex">
        <img src={imageURL} />
        <div>
          <p className=" text-black text-lg">{title}</p>
          <div className="flex space-x-4 mt-1">
            <Button
              icon={PiHeart}
              iconClassName="text-slate-400"
              text="Add to favorites"
              textClassName="text-slate-400 text-sm"
              onClick={() => {}}
            />
            <Button
              icon={PiX}
              iconClassName="text-red-600"
              text="Remove"
              textClassName="text-red-600 text-sm"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <QuantityInput />
      <div className="text-center text-black text-lg font-bold">${price}</div>
    </div>
  );
}
