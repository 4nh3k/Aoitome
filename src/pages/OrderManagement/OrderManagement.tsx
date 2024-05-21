import { useQuery } from "@tanstack/react-query";
import { Badge, Pagination, Tabs } from "flowbite-react";
import { useState } from "react";
import { orderingApi } from "../../apis/ordering.api";
import Container from "../../components/Container";
import OrderList from "../../components/OrderList";
import { RowData } from "../../components/OrderList/OrderList";
import { getUIDFromLS } from "../../utils/auth";

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
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: isAdmin ? ["order", page - 1] : ["order", userId, page - 1],
    queryFn: async () => {
      if (!isAdmin) {
        const data = await orderingApi.getOrderByUser(userId, page - 1, 10);

        return data.data;
      } else {
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
      status: (
        <Badge className="w-fit" color={getColor(item.orderStatusId)}>
          {item.orderStatusName}
        </Badge>
      ),
      action: "View",
    };
  });

  const totalPages = Math.ceil((data?.totalItems ?? 0) / (data?.pageSize ?? 1));

  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="All">
          {!res && <div>No data</div>}
          {res && (
            <>
              <OrderList data={res} />
              {totalPages >= 1 && (
                <Pagination
                  currentPage={page}
                  onPageChange={function (page: number): void {
                    setPage(page);
                  }}
                  totalPages={totalPages}
                />
              )}
            </>
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
