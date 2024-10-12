interface QuantityInputProps {
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
}

export function QuantityInput({
  quantity,
  onQuantityChange,
}: QuantityInputProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange && onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange && onQuantityChange(quantity + 1);
  };

  return (
    <div className="max-w-xs">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={handleDecrement}
          data-input-counter-decrement="quantity-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>

        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-9 text-center text-gray-900 text-sm focus:border-1 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={quantity}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10);
            if (!isNaN(newQuantity) && newQuantity >= 0) {
              onQuantityChange && onQuantityChange(newQuantity);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && e.currentTarget.value.length === 1) {
              onQuantityChange && onQuantityChange(1);
            }
          }}
          required
        />
        <button
          type="button"
          onClick={handleIncrement}
          data-input-counter-increment="quantity-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
