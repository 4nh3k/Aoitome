import { Select } from "flowbite-react";

interface DiscountInputProps {
  label?: string;
  className: string;
  placeholder: string;
  dropdownList?: string[];
  enableDropdown?: boolean;
  enableButton?: boolean;
}

export function DiscountInput({
  label,
  className,
  dropdownList,
  placeholder,
  enableDropdown = true,
  enableButton = true
}: DiscountInputProps) {
  return (
    <form className={className}>
      <span className="text-sm font-medium leading-5 mb-4">{label != null ? label : "Discount type"}</span>
      <div className="flex w-full self-stretch items-stretch">
        {enableDropdown && dropdownList!.length > 0 ? (
          <Select class='flex w-fit h-full rounded-r-none rounded-l-md rounded-lg border-1 border-solid border-gray-300 font-semibold text-sm' id="countries" required>
            {dropdownList.map((dropdown) => (
              <option>{dropdown}</option>
            ))}
          </Select>
        ) : (
          <></>
        )}
        <div className={`relative w-full`}>
          <input
            type="search"
            id="search-dropdown"
            className={`self-strech block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg ${!enableDropdown ? "rounded-l-lg" : "border-s-gray-50 border-s-2 "
              } border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
            placeholder={placeholder}
            required
          />
          {enableButton && (<button
            type="submit"
            className="absolute rounded-r-lg top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>)}
        </div>
      </div>
    </form>
  );
}
