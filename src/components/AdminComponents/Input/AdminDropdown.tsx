import { Select } from "flowbite-react";
import React from "react";

interface AdminDropdownProps {
  title: string;
  name: string;
  items: { key: number; value: string }[];
  value: string;
  onChange: (e, key: number) => void;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({
  title,
  items,
  value,
  name,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedOption = items.find((option) => option.value === value);
    const key = selectedOption ? selectedOption.key : null;
    onChange(e, key);
  };
  console.log(items);
  return (
    <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
      <span className="text-sm font-medium leading-5">{title}</span>
      <Select
        name={name}
        className="self-strech w-full"
        required
        value={value}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default AdminDropdown;
