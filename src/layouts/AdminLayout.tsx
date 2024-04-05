import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminComponents/Header/AdminHeader";
import Sidebar from "../components/AdminComponents/Sidebar/Sidebar";
export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-y-hidden item flex-wrap items-stretch">
      <AdminHeader className={"fixed top-0 z-50 items-stretch w-full"} />
      <Sidebar className="fixed top-[4.3125rem] bottom-0 z-55 overflow-y-scroll"></Sidebar>
      <div className='bg-gray-50 w-[calc(100%-15.625rem)] ml-auto overflow-y-hidden h-full'>
        <Outlet/>
      </div>
    </div>
  );
}