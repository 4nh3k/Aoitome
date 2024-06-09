import orderApi from "@/apis/order.api";
import OrderList from "@/components/OrderList";
import { AllDTO } from "@/types/Orders/AllOrdersDTO.type";
import { OrderDTO } from "@/types/Orders/OrderDto.type";
import { getIsAdmin, getUIDFromLS } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { Badge, Tabs } from "flowbite-react";
import { useState } from "react";
import Container from "../../components/Container";

const getColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "info";
    case "processing":
      return "purple";
    case "shipping":
      return "primary";
    case "completed":
      return "success";
    case "cancelled":
      return "failure";
    default:
      return "success";
  }
};

export function OrderManagement() {
  const userId = getUIDFromLS();
  const [page, setPage] = useState(1);
  const isAdmin = getIsAdmin();

  const { data, isLoading } = useQuery({
    queryKey: isAdmin ? ["order", page] : ["order", userId, page],
    queryFn: async () => {
      if (!isAdmin) {
        const data = await orderApi.getOrderByUser(userId);
        const res: AllDTO<OrderDTO> = {
          totalCount: 10,
          data: data.data.result ?? [],
        };
        return res;
      } else {
        const data = await orderApi.getAllOrders(page, 10);

        return data.data.result;
      }
    },
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="All">
          <OrderList
            data={
              data?.data.map((order) => {
                return {
                  order_id: order.id,
                  customer_name: order.userId,
                  total: order.totalPrice,
                  status: (
                    <Badge
                      className="w-fit"
                      color={getColor(order.orderStatus)}
                    >
                      {order.orderStatus}
                    </Badge>
                  ),
                  action: "View",
                };
              }) ?? []
            }
          />
        </Tabs.Item>
        <Tabs.Item title="Pending">
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboard tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Awaiting pickup">
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Settings tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Out for delivery">
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Delivered">Disabled content</Tabs.Item>
        <Tabs.Item title="Canceled Order">Disabled content</Tabs.Item>
        <Tabs.Item title="Refund">Disabled content</Tabs.Item>
      </Tabs>
    </Container>
  );
}
