import { Button } from "flowbite-react";

interface OrderPriceSummaryProps {
  textOnly?: boolean;
  originalPrice?: number;
  savings?: number;
  tax?: number;
  storePickup?: number;
  isLoading?: boolean;
  onClick?: () => void;
}

export function OrderPriceSummary({
  textOnly = false,
  originalPrice = 2000,
  savings = 200,
  tax = 799,
  isLoading = false,
  storePickup = 99,
  onClick,
}: OrderPriceSummaryProps) {
  return (
    <div className="w-full px-5 pt-5 pb-2.5 bg-white rounded-lg border border-gray-200 flex-col justify-start items-start inline-flex">
      {!textOnly && (
        <div className="text-black text-lg font-semibold">Order Summary</div>
      )}{" "}
      <div className="w-full space-y-2 mt-2">
        <div className="flex w-full justify-between">
          <span className="text-black text-base font-normal">
            Original price
          </span>
          <span className="text-black text-base font-medium">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full justify-between">
          <span className="text-black text-base font-normal">Savings</span>
          <span className="text-emerald-600 text-base font-medium">
            -${savings.toFixed(2)}
          </span>
        </div>
        {/* <div className="flex w-full justify-between">
          <span className="text-black text-base font-normal">Store pickup</span>
          <span className="text-black text-base font-medium">
            -${storePickup.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full justify-between">
          <span className="text-black text-base font-normal">Tax</span>
          <span className="text-black text-base font-medium">
            -${tax.toFixed(2)}{" "}
          </span>
        </div> */}
        <div className="py-2.5 border-t border-gray-200 flex w-full justify-between">
          <span className="text-black text-base font-semibold">Total</span>
          <span className="text-black text-base font-semibold">
            ${(originalPrice - savings - storePickup - tax).toFixed(2)}
          </span>
        </div>
        {!textOnly && (
          <>
            <Button
              className="w-full"
              size="sm"
              disabled={isLoading}
              onClick={onClick}
            >
              {!isLoading && "Proceed to checkout"}
              {isLoading && "Processing..."}
            </Button>
            <div className="text-center">
              <span className="text-black text-xs font-medium">or </span>
              <span className="text-blue-700 text-xs font-medium underline">
                Continue Shopping
              </span>
              <span className="text-blue-700 text-xs font-medium">&rarr;</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
