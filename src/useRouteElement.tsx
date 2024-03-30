import { useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
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
      ],
    },
  ]);
  return routeElement;
}
