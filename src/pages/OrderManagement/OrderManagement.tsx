import { useQuery } from "@tanstack/react-query";
import { Badge, Pagination, Tabs } from "flowbite-react";
import { useState } from "react";
import { orderingApi } from "@/apis/ordering.api";
import Container from "@/components/Container";
import OrderList, { RowData } from "@/components/OrderList/OrderList";
import { getUIDFromLS } from "@/utils/auth";
import { Fade } from "react-awesome-reveal";

const getColor = (status: number) => {
  switch (status) {
    case 1:
      return "info";
    case 2:
      return "purple";
    case 3:
      return "primary";
    case 4:
      return "success";
    case 5:
      return "failure";
    default:
      return "success";
  }
};

interface OrderManagementProps {
  isAdmin?: boolean;
}

export function OrderManagement({ isAdmin }: OrderManagementProps) {
  const userId = getUIDFromLS();
  console.log('UserId', userId);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: isAdmin ? ["order", page - 1] : ["order", userId, page - 1],
    queryFn: async () => {
      if (!isAdmin) {
        console.log("Beginning fetching user orders");
        const data = await orderingApi.getOrderByUser(userId, page - 1, 1000);

        return data.data;
      } else {
        console.log("Beginning fetching admin orders");
        const data = await orderingApi.getOrderingByPage(page - 1, 10);

        return data.data;
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const res: RowData[] | undefined = data?.data.map((item) => {
    return {
      order_id: item.id,
      customer_name: item.buyerName,
      total: item.totalAmount,
      order_date: item.orderDate,
      status: (
        <Badge
          className="py-3 content-box w-24 text-center flex justify-center"
          color={getColor(item.orderStatusId)}
        >
          {item.orderStatusName}{" "}
        </Badge>
      ),
      action: "View",
    };
  });

  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="All">
          {!res && <div>No data</div>}
          {res && (
            <Fade triggerOnce={true}>
              <OrderList data={res}/>
            </Fade>
          )}
        </Tabs.Item>
        <Tabs.Item title="Pending"></Tabs.Item>
        <Tabs.Item title="Awaiting pickup"></Tabs.Item>
        <Tabs.Item title="Out for delivery"></Tabs.Item>
        <Tabs.Item title="Delivered">Disabled content</Tabs.Item>
        <Tabs.Item title="Canceled Order">Disabled content</Tabs.Item>
        <Tabs.Item title="Refund">Disabled content</Tabs.Item>
      </Tabs>
    </Container>
  );
}
