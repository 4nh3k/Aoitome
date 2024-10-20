import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarItemProps {
  imageSrc?: string;
  label: string;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ imageSrc, label, link }) => {
  return (
    <NavLink
      to={`/${link === "" || link ? link : label.toLowerCase()}`}
      end={true}
      className={({ isActive }) =>
        `hover:bg-gray-100 rounded-lg px-4 py-3 mx-0 lg:px-2 menu-item flex justify-center lg:justify-start items-center gap-2 ${
          isActive ? "bg-gray-200 hover:bg-gray-200" : ""
        }`
      }
    >
      {imageSrc && <img src={imageSrc} width={24} height={24}></img>}
      {label}
    </NavLink>
  );
};

export default SidebarItem;
