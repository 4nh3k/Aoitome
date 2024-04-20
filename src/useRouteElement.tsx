import { useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Homepage from "./pages/Homepage";
import OrderSummary from "./pages/OrderSummary";
import ProductDetails from "./pages/ProductDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminPage/Dashboard/Dashboard";
import BookGridPage from "./pages/AdminPage/BookList/BookGridPage";
import BookDetail from "./pages/AdminPage/BookDetail/BookDetail";
import AdminAccount from "./pages/AdminPage/AccountPage/AdminAccount";
import AddVoucher from "./pages/AdminPage/VoucherManagement/AddVoucher";
import { NotificationPage } from "./pages/NotificationPage/NotificationPage";
import OrderManagement from "./pages/OrderManagement";
import OrderTracking from "./pages/OrderTracking";
import { VoucherManagement } from "./pages/AdminPage/VoucherManagement/VoucherManagement";
import UserAccount from "./pages/UserAccount/UserAccount";
import { UserCouponManagement } from "./pages/UserCouponManagement/UserCouponManagement";
import { path } from "./constants/path";
import LoginModals from "./components/Modals/LoginModals";
import { RegisterModals } from "./components/Modals/RegisterModals/RegisterModals";
import ForgotPassModals from "./components/Modals/ForgotPassModals";

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <LoginModals openModal={true} onCloseModal={function (): void {
        throw new Error("Function not implemented.");
      } } onSignUpClick={function (): void {
        throw new Error("Function not implemented.");
      } } onForgotPassClick={function (): void {
        throw new Error("Function not implemented.");
      } } />,
      path: path.login
    },
    {
      element: <RegisterModals openModal={true} onCloseModal={function (): void {
        throw new Error("Function not implemented.");
      } } onSignInClick={function (): void {
        throw new Error("Function not implemented.");
      } } />,
      path: path.register
    },

    {
      element: <ForgotPassModals openModal={true} onCloseModal={function (): void {
        throw new Error("Function not implemented.");
      } } />,
      path: path.forgotPass
    },

    {
      element: <MainLayout />,
      children: [
        { element: <Homepage />, path: "/" },
        {
          element: <ProductDetails />,
          path: path.product,
        },
        {
          element: <Cart />,
          path: path.cart,
        },
        {
          element: <Checkout />,
          path: path.checkout,
        },
        {
          element: <OrderSummary />,
          path: path.orderSummary,
        },
        {
          element: <NotificationPage />,
          path: path.notificationPage
        },
        {
          element: <OrderManagement />,
          path: path.customerOrder
        },
        {
          element: <OrderTracking />,
          path: path.customerOrderTracking
        },
        {
          element: <UserCouponManagement />,
          path: path.customerCoupon
        },
        {
          element: <UserAccount />,
          path: path.customerAccount
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          element: <AdminDashboard/>,
          path: path.adminDashboard
        },
        {
          element: <BookGridPage />,
          path: path.adminProducts
        },
        {
          element: <BookDetail />,
          path: path.adminBookDetail
        },
        {
          element: <AdminAccount />,
          path: path.adminAccount
        },
        {
          element: <AddVoucher voucherType={""} />,
          path: path.adminAddVoucher
        },
        {
          element: <VoucherManagement />,
          path: path.adminVoucherManagement
        }
      ]
    }
  ]);
  return routeElement;
}
