import { useMutation } from "@tanstack/react-query";
import { Dropdown } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../../apis/auth.api";
import Logo from "../../../assets/icon/Logo.svg";
import NotificationIcon from "../../../assets/icon/bell-outline.svg";
import GridIcon from "../../../assets/icon/grid-outline.svg";
import Elysia from "../../../assets/img/elysia.jpg";
import { useAppContext } from "../../../contexts/app.context";
import { clearLS } from "../../../utils/auth";

interface AdminHeaderProps {
  className?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ className }) => {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      clearLS();
      setIsAuthenticated(false);
      navigate("/login");
      await authApi.logout();
    },
  });
  return (
    <div
      className={` ${className} flex flex-col px-6 justify-center align-middle border-1 border-solid border-gray-200 bg-white`}
    >
      <div
        id="navBar"
        className="flex py-4 justify-between items-center self-stretch"
      >
        <div id="logo_role" className="flex items-center gap-[4.25rem]">
          <div id="logo" className="flex items-center gap-[1.5rem]">
            <img src={Logo} width={138} height={36}></img>
            <span className="text-2xl font-semibold text-secondary">Admin</span>
          </div>
        </div>
        <div id="cta" className="flex items-center gap-4">
          <div
            id="user-button"
            className="flex justify-center items-center gap-2 py-5]"
          >
            <Dropdown
              label=""
              renderTrigger={() => (
                <span className="small font-medium flex items-center justify-between">
                  <img
                    className="rounded-full"
                    src={Elysia}
                    width={36}
                    height={36}
                  ></img>
                  <span className="text-sm font-medium ml-2">Elysia</span>{" "}
                </span>
              )}
            >
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item onClick={() => logoutMutation.mutate()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div id="grid-btn-container" className="flex px-[1.25rem]">
            <img src={GridIcon} width={20} height={20}></img>
          </div>
          <div id="grid-btn-container" className="flex px-1">
            <img src={NotificationIcon} width={24} height={24}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
