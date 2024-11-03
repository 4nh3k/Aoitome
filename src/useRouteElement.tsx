import ForgotPassModals from "@/components/Modals/ForgotPassModals";
import LoginModals from "@/components/Modals/LoginModals";
import { RegisterModals } from "@/components/Modals/RegisterModals/RegisterModals";
import Shimmer from "@/components/TestShimmer/Shimmer";
import { path } from "@/constants/path";
import AdminLayout from "@/layouts/AdminLayout";
import MainLayout from "@/layouts/MainLayout";
import AdminAccount from "@/pages/AdminPage/AccountPage/AdminAccount";
import UserAccountInAdmin from "@/pages/AdminPage/AccountPage/UserAccountInAdmin";
import AddBook from "@/pages/AdminPage/BookList/AddBook";
import BookGridPage from "@/pages/AdminPage/BookList/BookGridPage";
import BookReviewList from "@/pages/AdminPage/BookList/BookReviewList";
import EditBook from "@/pages/AdminPage/BookList/EditBook";
import CustomerList from "@/pages/AdminPage/CustomerList/CustomerList";
import AdminDashboard from "@/pages/AdminPage/Dashboard/Dashboard";
import AddVoucher from "@/pages/AdminPage/VoucherManagement/AddVoucher";
import { VoucherManagement } from "@/pages/AdminPage/VoucherManagement/VoucherManagement";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Homepage from "@/pages/Homepage";
import { NotificationPage } from "@/pages/NotificationPage/NotificationPage";
import OrderManagement from "@/pages/OrderManagement";
import OrderSummary from "@/pages/OrderSummary";
import OrderTracking from "@/pages/OrderTracking";
import PaymentSuccess from "@/pages/PaymentSuccess/PaymentSuccess";
import ProductDetails from "@/pages/ProductDetails";
import SearchPage from "@/pages/SearchPage";
import UserAccount from "@/pages/UserAccount/UserAccount";
import { UserCouponManagement } from "@/pages/UserCouponManagement/UserCouponManagement";
import { useNavigate, useRoutes } from "react-router-dom";

export default function useRouteElement() {
  const navigate = useNavigate();
  const routeElement = useRoutes([
    {
      element: (
        <LoginModals
          openModal={true}
          onCloseModal={function (): void {
            navigate("/");
          }}
          onSignUpClick={function (): void {
            navigate(path.register);
          }}
          onForgotPassClick={function (): void {
            navigate(path.forgotPass);
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
            navigate("/");
          }}
          onSignInClick={function (): void {
            navigate(path.login);
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
    {
      element: <MainLayout />,
      children: [
        { element: <Shimmer />, path: "/shimmer" },
        { element: <Homepage />, path: "/" },
        {
          element: <ProductDetails />,
          path: path.product,
        },
        {
          element: <OrderSummary isDetail={true} />,
          path: path.orderDetails,
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
          element: <PaymentSuccess />,
          path: path.paymentSuccess,
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
          element: <CustomerList />,
          path: path.adminCustomers,
        },
        {
          element: <BookReviewList />,
          path: path.adminBookReviews,
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
          element: <UserAccountInAdmin />,
          path: path.adminCustomerAccount,
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
