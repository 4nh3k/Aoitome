"use client";

import { Footer } from "flowbite-react";
import { PiCreditCard, PiTruck } from "react-icons/pi";
import { TbMailbox } from "react-icons/tb";
import { path } from "../../constants/path";

function Footers() {
  return (
    <Footer className="py-4 lg:px-32 sm:px-4 border-t-1 border-b-1 rounded-none">
      <div>
        <div className="grid grid-cols-3 gap-80">
          <div className="flex items-start">
            <PiTruck size={20} className="mr-2 text-gray-600" />
            <div>
              <Footer.Title
                className="text-black text-xs font-bold mb-2"
                title="ORDER TRACKING & SHIPPING"
              />
              <Footer.LinkGroup col>
                <span className="very-small font-medium w-72 text-gray-600">
                  Find out when your online purchase will arrive or schedule a
                  delivery{" "}
                </span>
                <Footer.Link
                  className="text-blue-700 text-xs font-medium underline hover:text-blue-900"
                  href={path.customerOrderTracking}
                >
                  Track Your Order
                </Footer.Link>
                <Footer.Link
                  className="text-blue-700 text-xs font-medium underline hover:text-blue-900"
                  href="#"
                >
                  Schedule delivery
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className="flex items-start">
            <PiCreditCard size={20} className="mr-2 text-gray-600" />
            <div>
              <Footer.Title
                className="text-black text-xs font-bold mb-2"
                title="OUR CREDIT CARD"
              />
              <Footer.LinkGroup col>
                <span className="very-small font-medium w-72 text-gray-600">
                  Earn Reward Dollars every time you shop*, plus get access to
                  special offers and events.
                </span>
                <Footer.Link
                  className="text-blue-700 text-xs font-medium underline hover:text-blue-900"
                  href="#"
                >
                  Apply Now
                </Footer.Link>
                <Footer.Link
                  className="text-blue-700 text-xs font-medium underline hover:text-blue-900"
                  href="#"
                >
                  Manage Your Account
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className="flex items-start">
            <TbMailbox size={20} className="mr-2 text-gray-600" />
            <div>
              <Footer.Title
                className="text-black text-xs font-bold mb-2"
                title="CONTACT US"
              />
              <Footer.LinkGroup col>
                <span className="very-small font-medium w-72 text-gray-600">
                  UIT, HCM City, Vietnam
                </span>
                <span className="very-small font-medium w-72 text-gray-600">
                  Office: +84 456 7890 1234
                </span>
                <span className="very-small font-medium w-72 text-gray-600">
                  Support: 4nh3k@email.com
                </span>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full flex border-t-1 pt-4 mt-4">
          <img
            className=" h-6 sm:h-9 border-r-1 pr-4 mr-4"
            src="/src/assets/icon/Logo.svg"
            alt="Aoitome Logo"
          />
          <div>
            <div className="flex justify-between text-gray-600">
              <Footer.Copyright
                className="mr-4 text-xs"
                href="#"
                by="Aoitome™ All rights reserved."
                year={2024}
              />
              <Footer.LinkGroup className="">
                <Footer.Link className="text-xs" href="#">
                  Conditions of Use & Sale
                </Footer.Link>
                <Footer.Link className="text-xs" href="#">
                  Privacy Notice
                </Footer.Link>
                <Footer.Link className="text-xs" href="#">
                  Cookies Notice
                </Footer.Link>
                <Footer.Link className="text-xs" href="#">
                  Ads Notice{" "}
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="w-full mt-2 text-gray-600 text-xs font-medium leading-none">
              If you are using a screen reader and are having problems using
              this website, please call (+123) 456-7890 for assistance{" "}
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footers;
