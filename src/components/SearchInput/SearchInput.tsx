import { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  className: string;
  placeholder: string;
  dropdownList?: string[];
  enableDropdown?: boolean;
  enableSizing?: boolean; // New prop to enable resizing of the select element
  onSubmit: (searchValue: string) => void; // Function to handle form submission
  onChange: (searchValue: string) => void; // Function to handle input change
  onDropdownChange: (type: string) => void;
}

export default function SearchInput({
  className,
  dropdownList,
  placeholder,
  enableDropdown = true,
  enableSizing = false, // Default is true, which enables select resizing
  onChange,
  onSubmit,
  onDropdownChange,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(dropdownList ? dropdownList[0] : ""); // Set initial filter based on dropdownList

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search term: " + searchValue);
    onSubmit("Search result:" + searchValue); // Call onSubmit function with current search value
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    console.log("Search term: " + newValue);
    setSearchValue(newValue); // Update local state
    onChange(newValue); // Call onChange function with new value
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (enableDropdown) {
      onDropdownChange(value);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="flex">
        {enableDropdown && dropdownList && dropdownList.length > 0 ? (
          <select
            value={filter}
            onChange={handleDropdownChange}
            className="appearance-none bg-gray-50 overflow-y-hidden overflow-x-visible cursor-pointer text-sm border-sm inline-block rounded-l-sm border-r-[0.5px] border-r-gray-300 border-gray-300 border-transparent"
            required
          >
            {dropdownList.map((item, index) => (
              <option className="cursor-pointer" key={index}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
        <div className={`relative w-full`}>
          <input
            type="search"
            id="search-dropdown"
            className={`block p-2.5 w-full z-20 text-sm text-gray-90 border-none border-l-md border-l-0 border-r-1 border-r-sm`}
            placeholder={placeholder}
            value={searchValue}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-none"
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
          </button>
        </div>
      </div>
    </form>
  );
}
// focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500