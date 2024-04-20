import Bag from "../../../assets/icon/bag.svg";
import Book from "../../../assets/icon/book-outline.svg";
import PieChart from "../../../assets/icon/chart-pie-outline.svg";
import Voucher from "../../../assets/icon/inbox-full-outline.svg";
import Message from "../../../assets/icon/messages-outline.svg";
import User from "../../../assets/icon/user.svg";
import { path } from "../../../constants/path";
import SidebarCollapse from "./SidebarCollapse";
import SidebarItem from "./SidebarItem";

interface AdminSidebarProps {
  className?: string;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  const bookSidebarItems = [
    { label: "All products", link: path.adminProducts },
    { label: "Add product", link: path.adminBookDetail },
    // { label: "All genres", link: "" },
    // { label: "All publishers", link: "" },
    // { label: "All authors", link: "" },
  ];

  const voucherSidebarItems = [
    {label: "All vouchers", link: path.adminVoucherManagement},
    {label: "Add voucher", link: path.adminAddVoucher},
  ];

  const customerServiceSidebarItems = [{ label: "Chat log", link: "" }];
  return (
    <div
      className={`${className} flex w-[15.625rem] items-start bg-white border-1 border-solid border-gray-200`}
    >
      <div className="flex flex-col items-start gap-6 flex-1">
        <div className="flex flex-col items-stretch gap-1 px-4 py-3 font-medium flex-wrap">
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
          <SidebarCollapse
            imageSrc={Book}
            label={"Product Management"}
            items={bookSidebarItems}
          ></SidebarCollapse>
          <SidebarItem
            imageSrc={Bag}
            label={"Order Management"}
            link={path.adminOrderManagement}
          />
          <SidebarCollapse label={"Voucher management"} items={voucherSidebarItems} imageSrc={Voucher} />
          <SidebarCollapse
            imageSrc={Message}
            label={"Customer Service"}
            items={customerServiceSidebarItems}
          ></SidebarCollapse>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
