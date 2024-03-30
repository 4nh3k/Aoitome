import { PiHeart, PiX } from "react-icons/pi";
import Button from "../../Button/Button";
import QuantityInput from "../../QuantityInput";

export function CartProduct() {
  // TODO: Add checkbox for selecting product
  return (
    <div className="h-32 w-full px-5 py-3.5 bg-white rounded border border-gray-200 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-2.5 flex">
        <img src="https://via.placeholder.com/92x92" />
        <div>
          <p className=" text-black text-lg font-medium">Product Name</p>
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
      <div className="text-center text-black text-lg font-bold">$90</div>
    </div>
  );
}
