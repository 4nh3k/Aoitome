import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./contexts/app.context";
import useRouteElement from "./useRouteElement";

export default function App() {
  const routeElement = useRouteElement();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="overflow-x-hidden overflow-y-hidden">
          {routeElement}
          <ToastContainer position="top-right" />
        </div>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
