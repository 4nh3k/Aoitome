import { KurumiList } from "@/assets/mockdata";
import React from "react";

const ProductListItem = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center p-4">
      <div className="flex flex-row gap-4 items-center">
        <img
          src={KurumiList[0].imageURL}
          width={64}
          height={64}
          className="object-cover"
        />
        <span className="text-lg">Date a Barrette vol 1</span>
      </div>
      <span className="text-md">$5.42</span>
      <span className="text-md">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;72</span>
      <div className="flex flex-row gap-4">
        <button className="border-1 rounded-md p-2 px-4 hover:bg-green-200">
          Edit
        </button>
        <button className="border-1 rounded-md p-2 px-4 hover:bg-red-500">Delete</button>
      </div>
    </div>
  );
};

export default ProductListItem;
