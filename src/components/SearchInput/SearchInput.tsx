import { Select } from "flowbite-react";
import { useState } from "react";
import customSelectTheme from "./SelectTheme";

interface SearchInputProps {
  className: string;
  placeholder: string;
  dropdownList?: string[];
  enableDropdown?: boolean;
  onSubmit: (searchValue: string) => void; // Function to handle form submission
  onChange: (searchValue: string) => void; // Function to handle input change
  onDropdownChange: (type: string) => void;
}

export default function SearchInput({
  className,
  dropdownList,
  placeholder,
  enableDropdown = true,
  onChange,
  onSubmit,
  onDropdownChange,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("Book id");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search term: " + searchValue)
    onSubmit("Search result:" + searchValue); // Call onSubmit function with current search value
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    console.log("Search term: " + newValue)
    setSearchValue(newValue); // Update local state
    onChange(newValue); // Call onChange function with new value
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (enableDropdown){
      onDropdownChange(value);
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="flex">
        {enableDropdown && dropdownList!.length > 0 ? (
          <Select value={filter} onChange={handleDropdownChange} className="min-w-fit" id="countries" theme={customSelectTheme} required>
            {dropdownList!.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Select>
        ) : (
          <></>
        )}
        <div className={`relative w-full`}>
          <input
            type="search"
            id="search-dropdown"
            className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg ${
              !enableDropdown ? "rounded-l-lg" : "border-s-gray-50 border-s-2 "
            } border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
            placeholder={placeholder}
            required
            value={searchValue}
            onChange={handleChange}
          />
          <button
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
          </button>
        </div>
      </div>
    </form>
  );
}
