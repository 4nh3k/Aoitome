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

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { element: <Homepage />, path: "/" },
        {
          element: <ProductDetails />,
          path: "/product",
        },
        {
          element: <Cart />,
          path: "/cart",
        },
        {
          element: <Checkout />,
          path: "/checkout",
        },
        {
          element: <OrderSummary />,
          path: "/order-summary",
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          element: <Homepage />,
          path: "/admin-product"
        },
        {
          element: <AdminDashboard/>,
          path: "/admin-dashboard"
        },
        {
          element: <BookGridPage />,
          path: "/admin-bookgrid"
        },
        {
          element: <BookDetail />,
          path: "/admin-bookdetail"
        },
        {
          element: <AdminAccount />,
          path: "/admin-account"
        }
      ]
    }
  ]);
  return routeElement;
}
