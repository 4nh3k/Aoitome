import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminComponents/Header/AdminHeader";
import Sidebar from "../components/AdminComponents/Sidebar/Sidebar";
export default function AdminLayout() {
  return (
    <div className="min-w-full flex flex-col min-h-screen overflow-y-hidden flex-wrap items-stretch">
      <AdminHeader className={"w-screen fixed top-0 left-0 right-0 z-50"} />
      <Sidebar className="fixed top-[4.3125rem] bottom-0 z-55 overflow-hidden min-h-full"></Sidebar>
      <div className=" pt-[4.3125rem] w-[calc(100%-15.625rem)] ml-auto overflow-x-hidden overflow-y-hidden h-full flex-grow px-[1.875rem] py-8 bg-background">
        <Outlet />
      </div>
    </div>
  );
}
