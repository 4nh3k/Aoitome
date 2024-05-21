import { Button, Datepicker } from "flowbite-react";
import CustomTable from "../CustomTable";
import SearchInput from "../SearchInput";

export interface RowData {
  order_id: number;
  customer_name: string;
  total: number;
  status: JSX.Element;
  action: string;
}
interface OrderListProps {
  data: RowData[];
}

export function OrderList({ data }: OrderListProps) {
  const headers = [
    {
      label: "Order ID",
      prop: "order_id",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Customer Name",
      prop: "customer_name",
      className: "text-gray-500 text-sm",
    },
    {
      label: "Total",
      prop: "total",
      className: "text-gray-900 font-semibold text-sm",
    },
    {
      label: "Status",
      prop: "status",
    },
    {
      label: "Action",
      prop: "action",
      className: "text-blue-700 text-xs font-medium hover:underline",
    },
  ];
  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between w-full">
        <div className="flex space-x-2 items-center">
          <span>Order Date</span>
          <Datepicker />
          <Button>Filter</Button>
        </div>
        <div className="flex w-1/2 space-x-2 items-center">
          <SearchInput
            className="w-full"
            placeholder={"Order ID"}
            dropdownList={["Order ID"]}
            onSubmit={function (searchValue: string): void {
              throw new Error("Function not implemented.");
            }}
            onChange={function (searchValue: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Button>Reset</Button>
        </div>
      </div>
      <CustomTable headers={headers} data={data} />
    </div>
  );
}
