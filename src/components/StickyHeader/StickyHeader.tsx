import { Dropdown } from "flowbite-react";
import { PiMapPin, PiPhoneFill } from "react-icons/pi";

export function StickyHeader() {
  return (
    <div className="py-2 lg:px-32 sm:px-4 bg-gray-100 flex items-center justify-between">
      <div className="small flex items-center space-x-1">
        <PiPhoneFill />
        <span>(555) 555-1234</span>
      </div>
      <span className="small">
        Get 50% off on Member Exclusive Month{" "}
        <span className="font-bold underline">Shop Now</span>
      </span>
      <div className="flex space-x-10">
        <Dropdown
          className="border-none bg-gray-100 text-sm font-medium"
          label={<span className="small font-medium">English(US)</span>}
          id="language"
          inline
        >
          <Dropdown.Item>English(US)</Dropdown.Item>
          <Dropdown.Item>Vietnamese(VN)</Dropdown.Item>
        </Dropdown>
        <Dropdown
          className="border-none bg-gray-100 text-sm font-medium"
          label={
            <div className="flex items-center space-x-1">
              <PiMapPin />
              <span className="small font-medium">Location</span>
            </div>
          }
          id="location"
          inline
        >
          <Dropdown.Item>English(US)</Dropdown.Item>
          <Dropdown.Item>Vietnamese(VN)</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
