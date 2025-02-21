import Bag from "@/assets/icon/bag.svg";
import Book from "@/assets/icon/book-outline.svg";
import PieChart from "@/assets/icon/chart-pie-outline.svg";
import User from "@/assets/icon/user.svg";
import { path } from "@/constants/path";
import SidebarCollapse from "./SidebarCollapse";
import SidebarItem from "./SidebarItem";
import Voucher from "@/assets/icon/shop.svg"

interface AdminSidebarProps {
  className?: string;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  const bookSidebarItems = [
    { label: "All books", link: path.adminProducts },
    { label: "Add book", link: path.adminAddProduct },
    { label: "Book reviews", link: path.adminBookReviews },
  ];

  const orderSidebarItems = [
    { label: "Order list", link: path.adminOrderManagement },
    { label: "Cancel order", link: "" },
    { label: "Refund order", link: "" },
  ];

  const customerServiceSidebarItems = [{ label: "Chat log", link: "" }];
  return (
    <div
      className={`${className} flex w-[15.625rem] items-start bg-white border-1 border-solid border-gray-200 overflow-y-scroll no-scrollbar pb-16`}
    >
      <div className="flex flex-col items-start gap-6 flex-1">
        <div className="flex flex-col items-strech gap-1 px-4 py-3 font-medium flex-wrap">
          <SidebarItem
            imageSrc={PieChart}
            label={"Dashboard"}
            link={path.adminDashboard}
          ></SidebarItem>
          <SidebarItem
            imageSrc={User}
            label={"Account"}
            link={path.adminAccount}
          ></SidebarItem>
          <SidebarItem
            imageSrc={User}
            label={"Customers"}
            link={path.adminCustomers}
          ></SidebarItem>
          <SidebarCollapse
            imageSrc={Book}
            label={"Books"}
            items={bookSidebarItems}
          ></SidebarCollapse>
          <SidebarCollapse
            imageSrc={Bag}
            label={"Order Management"}
            items={orderSidebarItems}
          ></SidebarCollapse>
          <SidebarItem
            imageSrc={Voucher}
            label={"Voucher Management"}
            link={path.adminVoucherManagement}
          ></SidebarItem>
          
          {/* <SidebarCollapse
            imageSrc={Message}
            label={"Customer Service"}
            items={customerServiceSidebarItems}
          ></SidebarCollapse> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
