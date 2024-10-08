import SearchInput from "@/components/SearchInput/SearchInput";
import { path } from "@/constants/path";
import { useMutation } from "@tanstack/react-query";
import { Dropdown, Navbar } from "flowbite-react";
import { useState } from "react";
import { PiList, PiShoppingCart, PiUser } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/auth.api";
import { useAppContext } from "../../contexts/app.context";
import { clearLS } from "../../utils/auth";
import Button from "../Button/Button";
import ForgotPassModals from "../Modals/ForgotPassModals";
import LoginModals from "../Modals/LoginModals";
import { RegisterModals } from "../Modals/RegisterModals/RegisterModals";
import Notification from "../Notification";
import { StickyHeader } from "../StickyHeader/StickyHeader";

interface HeaderProps {
  className?: string;
}

export default function Header(props: HeaderProps) {
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const [toggleRegisterModal, setToggleRegisterModal] = useState(false);
  const [toggleForgotPassModal, setToggleForgotPassModal] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (search: string) => {
    navigate(`/search?q=${searchValue}`);
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      clearLS();
      setIsAuthenticated(false);
      await authApi.logout();
    },
  });

  return (
    <div className={props.className}>
      {/* <StickyHeader /> */}
      <Navbar
        className="py-3 lg:px-32 sm:px-4 border-none bg-blue-100"
        fluid
        rounded
      >
        <Navbar.Brand href="/">
          <img
            className="mr-3 h-6 sm:h-9"
            src="/src/assets/icon/Logo.svg"
            alt="Aoitome Logo"
          />
        </Navbar.Brand>
        <SearchInput
          className="w-1/2 border-1 border-transparent border-gray-300 border-sm rounded-l-sm rounded-r-md p-0 focus-within:[&:has(input:focus)]:border-blue-500 overflow-hidden"
          onSubmit={handleSubmit}
          enableSizing={true}
          placeholder={"Enter a search term"}
          dropdownList={["By name", "By author", "By Elysia & Mei", ]}
          onChange={function (searchValue: string): void {
            setSearchValue(searchValue);
          }}
          onDropdownChange={function (type: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex space-x-4">
          <Notification />
          <Link to="/cart">
            <Button icon={PiShoppingCart} text={"Cart"} onClick={() => {}} />
          </Link>
          {!isAuthenticated ? (
            <Button
              icon={PiUser}
              text={"Account"}
              onClick={() => {
                setToggleLoginModal(true);
              }}
            />
          ) : (
            <Dropdown
              label=""
              renderTrigger={() => (
                <span className="small font-medium flex">
                  <PiUser className="mr-1" size={18} /> Account
                </span>
              )}
            >
              <Link to={path.customerAccount}>
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>

              <Link to={path.customerOrder}>
                <Dropdown.Item>My orders</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={() => logoutMutation.mutate()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          )}
          <LoginModals
            openModal={toggleLoginModal}
            onCloseModal={() => {
              setToggleLoginModal(false);
            }}
            onSignUpClick={() => {
              setToggleLoginModal(false);
              setToggleRegisterModal(true);
            }}
            onForgotPassClick={() => {
              setToggleLoginModal(false);
              setToggleForgotPassModal(true);
            }}
          />
          <RegisterModals
            openModal={toggleRegisterModal}
            onCloseModal={() => {
              setToggleRegisterModal(false);
            }}
            onSignInClick={() => {
              setToggleRegisterModal(false);
              setToggleLoginModal(true);
            }}
          />
          <ForgotPassModals
            openModal={toggleForgotPassModal}
            onCloseModal={() => {
              setToggleForgotPassModal(false);
            }}
          />
        </div>
      </Navbar>
      <div className="border-b-1 border-gray-200 py-3 px-32 text-black text-sm font-medium flex gap-11">
        <Dropdown
          label={
            <div className="flex space-x-1">
              <PiList size={18} />
              <span>All</span>
            </div>
          }
          inline
        >
          <Dropdown.Item href="#">Option 1</Dropdown.Item>
          <Dropdown.Item href="#">Option 2</Dropdown.Item>
          <Dropdown.Item href="#">Option 3</Dropdown.Item>
        </Dropdown>
        <button>Best Sellers</button>
        <button>Gift Cards</button>
        <button>Gift Ideas</button>
        <button>Deal of the day</button>
        <button>Top Deals</button>
        <button>New Releases</button>
      </div>
    </div>
  );
}
