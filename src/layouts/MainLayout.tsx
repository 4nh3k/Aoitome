import { Outlet } from "react-router-dom";
import Footers from "../components/Footers";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    // sticky -> chỉ work khi height container của nó xác định !
    <div className="flex flex-col h-screen overflow-auto min-w-[640px]">
      <Header className="" />
      <div className="flex-grow px-[6rem] py-8 bg-background z-0">
        <Outlet />
      </div>
      <Footers />
    </div>
  );
}
