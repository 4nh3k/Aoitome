import React from "react";

interface SizeSelectorProps {
  sizes: any[];
  selectedSize: number | null;
  onSizeSelect: (size: number) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <div className="flex space-x-2">
      {sizes.map((sizeObj) => (
        <button
          key={sizeObj.size}
          onClick={() => onSizeSelect(sizeObj.size)}
          className={`w-8 h-8 border ${
            sizeObj.size === selectedSize
              ? "bg-primary text-white hover:bg-primary"
              : " border-gray-300"
          } rounded-full flex items-center justify-center text-sm font-medium ${
            sizeObj.available
              ? "hover:bg-gray-100 text-gray-700"
              : "bg-gray-100 text-gray-300"
          } `}
          disabled={!sizeObj.available}
        >
          {sizeObj.size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
