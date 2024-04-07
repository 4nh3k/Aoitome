import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Homepage from "./pages/Homepage";
import OrderSummary from "./pages/OrderSummary";
import ProductDetails from "./pages/ProductDetails";

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
          element: <ProductDetails />,
          path: "/admin-product",
        },
      ],
    },
  ]);
  return routeElement;
}
