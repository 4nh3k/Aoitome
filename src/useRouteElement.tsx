import { useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <MainLayout />,
      children: [{ element: <Homepage />, path: "/" }],
    },
  ]);
  return routeElement;
}
