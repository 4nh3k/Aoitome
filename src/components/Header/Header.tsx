import SearchInput from "@/components/SearchInput/SearchInput";
import { path } from "@/constants/path";
import { useMutation } from "@tanstack/react-query";
import { Dropdown, Navbar } from "flowbite-react";
import { useState } from "react";
import { PiList, PiShoppingCart, PiUser } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import authApi from "@/apis/auth.api";
import { useAppContext } from "@/contexts/app.context";
import { clearLS } from "@/utils/auth";
import Button from "@/components/Button/Button";
import ForgotPassModals from "@/components/Modals/ForgotPassModals";
import LoginModals from "@/components/Modals/LoginModals";
import { RegisterModals } from "@/components/Modals/RegisterModals/RegisterModals";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";
import ResetPassModals from "@/components/Modals/ResetPassModals/ResetPassModals";

interface HeaderProps {
  className?: string;
}

export default function Header(props: HeaderProps) {
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const [toggleRegisterModal, setToggleRegisterModal] = useState(false);
  const [toggleForgotPassModal, setToggleForgotPassModal] = useState(false);
  const [toggleResetPassModal, setToggleResetPassModal] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (search: string) => {
    navigate(`/search?q=${searchValue}`);
  };
  const [email, setEmail] = useState("");

  const handleStoreEmail = (email: string) => {
    console.log("email", email);
    setEmail(email);
  }

  const logoutMutation = useMutation({
    mutationFn: async () => {
      clearLS();
      setIsAuthenticated(false);
      toast.success("Logout successfully");
      navigate("/");
      await authApi.logout();
    },
  });

  return (
    <div className={props.className}>
      {/* <StickyHeader /> */}
      <Navbar
        className="py-3 px-1 lg:px-[6rem] border-none bg-blue-100"
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
          className="w-1/2 border-2 border-transparent border-gray-300 border-sm rounded-l-sm rounded-r-md p-0 focus-within:[&:has(input:focus)]:border-blue-500 overflow-hidden"
          onSubmit={handleSubmit}
          enableSizing={true}
          placeholder={"Enter a search term"}
          dropdownList={["By name", "By author", "By Elysia & Mei"]}
          onChange={function (searchValue: string): void {
            setSearchValue(searchValue);
          }}
          onDropdownChange={function (type: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex space-x-3">
          <Notification />
          <Link to="/cart">
            <Button
              textClassName="hidden lg:inline-block"
              icon={PiShoppingCart}
              text={"Cart"}
              onClick={() => {}}
            />
          </Link>
          {!isAuthenticated ? (
            <Button
              textClassName="hidden lg:inline-block"
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
                <span className="small font-medium lg:inline-block min-w-fit">
                  <PiUser className="mr-1 inline" size={18} />{" "}
                  <span className="hidden lg:inline-block">Account</span>
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
            onTokenReceived={() => {
              setToggleForgotPassModal(false);
              setToggleResetPassModal(true);
              console.log("Open reset pass modal");
            }}
            handleStoreEmail={handleStoreEmail}
          />
          <ResetPassModals openModal={toggleResetPassModal} onCloseModal={() => {setToggleResetPassModal(false); setToggleForgotPassModal(true);}} email={email} />
        </div>
      </Navbar>
      <div className="border-b-1 border-gray-200 py-0 px-2 lg:px-[6rem] text-black text-sm font-medium flex ">
        <Dropdown
          className="mr-2"
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
        <div className="flex">
          <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
            Best Sellers
          </button>
          <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
            Gift Cards
          </button>
          <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
            Top Deals
          </button>
          <button className="h-full py-3 px-12 hover:bg-gray-200 rounded-sm">
            New Releases
          </button>
        </div>
      </div>
    </div>
  );
}
