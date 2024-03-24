import { Outlet } from "react-router-dom";
import Footers from "../components/Footers";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="sticky top-0 z-50" />
      <div className="flex-grow px-[7.8rem] py-8 bg-background">
        <Outlet />
      </div>
      <Footers />
    </div>
  );
}
