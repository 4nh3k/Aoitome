import { useRoutes } from "react-router-dom";
import ForgotPassModals from "./components/Modals/ForgotPassModals";
import LoginModals from "./components/Modals/LoginModals";
import { RegisterModals } from "./components/Modals/RegisterModals/RegisterModals";
import { path } from "./constants/path";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import AdminAccount from "./pages/AdminPage/AccountPage/AdminAccount";
import BookDetail from "./pages/AdminPage/BookDetail/BookDetail";
import BookGridPage from "./pages/AdminPage/BookList/BookGridPage";
import AdminDashboard from "./pages/AdminPage/Dashboard/Dashboard";
import AddVoucher from "./pages/AdminPage/VoucherManagement/AddVoucher";
import { VoucherManagement } from "./pages/AdminPage/VoucherManagement/VoucherManagement";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Homepage from "./pages/Homepage";
import { NotificationPage } from "./pages/NotificationPage/NotificationPage";
import OrderManagement from "./pages/OrderManagement";
import OrderSummary from "./pages/OrderSummary";
import OrderTracking from "./pages/OrderTracking";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";
import { Test } from "./pages/TestAPIPage/Test";
import UserAccount from "./pages/UserAccount/UserAccount";
import { UserCouponManagement } from "./pages/UserCouponManagement/UserCouponManagement";
import AddBook from "./pages/AdminPage/BookList/AddBook";
import EditBook from "./pages/AdminPage/BookList/EditBook";

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: (
        <LoginModals
          openModal={true}
          onCloseModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSignUpClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          onForgotPassClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
      path: path.login,
    },
    {
      element: (
        <RegisterModals
          openModal={true}
          onCloseModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSignInClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
      path: path.register,
    },

    {
      element: (
        <ForgotPassModals
          openModal={true}
          onCloseModal={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
      path: path.forgotPass,
    },
    { element: <Test />, path: "/Test" },

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
          path: path.notificationPage,
        },
        {
          element: <OrderManagement />,
          path: path.customerOrder,
        },
        {
          element: <OrderTracking />,
          path: path.customerOrderTracking,
        },
        {
          element: <SearchPage />,
          path: path.search,
        },
        {
          element: <UserCouponManagement />,
          path: path.customerCoupon,
        },
        {
          element: <UserAccount />,
          path: path.customerAccount,
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          element: <AdminDashboard />,
          path: path.adminDashboard,
        },
        {
          element: <OrderManagement />,
          path: path.adminOrderManagement,
        },
        {
          element: <BookGridPage />,
          path: path.adminProducts,
        },
        {
          element: <AddBook />,
          path: path.adminAddProduct,
        },
        {
          element: <EditBook />,
          path: path.adminProduct,
        },
        {
          element: <AdminAccount />,
          path: path.adminAccount,
        },
        {
          element: <AddVoucher voucherType={""} />,
          path: path.adminAddVoucher,
        },
        {
          element: <VoucherManagement />,
          path: path.adminVoucherManagement,
        },
      ],
    },
  ]);
  return routeElement;
}
