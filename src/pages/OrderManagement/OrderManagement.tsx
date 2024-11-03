import { orderingApi } from "@/apis/ordering.api";
import Badge from "@/components/Badge";
import Container from "@/components/Container";
import OrderList, { RowData } from "@/components/OrderList/OrderList";
import { getUIDFromLS } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "flowbite-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

interface OrderManagementProps {
  isAdmin?: boolean;
}

export function OrderManagement({ isAdmin }: OrderManagementProps) {
  const userId = getUIDFromLS();
  console.log("userId", userId);
  const [page, setPage] = useState(1);
  console.log("isAdmin", isAdmin);

  const { data, isLoading } = useQuery({
    queryKey: isAdmin ? ["order", page - 1] : ["order", userId, page - 1],
    queryFn: async () => {
      if (!isAdmin) {
        console.log("Beginning fetching user orders");
        const data = await orderingApi.getOrderByUser(userId, page - 1, 1000);
        console.log("user data", data);

        return data.data;
      } else {
        console.log("Beginning fetching admin orders");
        const data = await orderingApi.getOrderingByPage(page - 1, 10);

        console.log("data", data);
        return data.data;
      }
    },
  });

  const res: RowData[] | undefined = data?.data.map((item) => {
    return {
      order_id: item.id,
      customer_name: item.buyerName,
      total: item.totalAmount,
      order_date: item.orderDate,
      status: (
        <Badge
          orderStatusId={item.orderStatusId}
          orderStatusName={item.orderStatusName}
          orderId={item.id}
          page={page}
          allowEdit={isAdmin}
        />
      ),
      action: <Link to={`/order-details/${item.id}`}>View</Link>,
    };
  });

  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline">
        {isLoading && <BeatLoader color="#2563eb" />}
        {!isLoading && (
          <Tabs.Item active title="All">
            {!res && <div>No data</div>}
            {res && (
              <Fade triggerOnce={true}>
                <OrderList data={res} />
              </Fade>
            )}
          </Tabs.Item>
        )}
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
