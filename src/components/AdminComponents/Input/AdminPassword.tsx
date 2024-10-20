import React, { useState } from "react";
import Eye from "@/assets/icon/eye.svg";
import EyeSlash from "@/assets/icon/eye-slash.svg";
import { PiEye, PiEyeSlash } from "react-icons/pi";
interface AdminInputProps {
  type: string;
  title: string;
  name: string;
  value: any;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminPassword: React.FC<AdminInputProps> = ({
  title,
  name,
  value,
  placeholder,
  onChange,
  type,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col items-start gap-2 flex-1 self-stretch flex-grow">
      <span className="text-sm font-medium leading-5">{title}</span>
      <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
        <input
          type={isPasswordVisible ? "text" : "password"} // Toggle input type
          name={name}
          className="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 p-0"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={(e) => {
            if (type === "number" && !/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {/* Eye icon based on visibility state */}
          {isPasswordVisible ? <PiEye /> : <PiEyeSlash />}
        </button>
      </div>
    </div>
  );
};

export default AdminPassword;
