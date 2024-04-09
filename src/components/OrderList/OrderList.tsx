import { Badge, Button, Datepicker } from "flowbite-react";
import CustomTable from "../CustomTable";
import SearchInput from "../SearchInput";

export function OrderList() {
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
  const data = [
    {
      order_id: "220608A1FNXWGT",
      customer_name: "John Smith",
      total: "$999",
      status: (
        <Badge className="w-fit" color="success">
          Completed
        </Badge>
      ),
      action: "See details",
    },
    {
      order_id: "220608C2JMKPQV",
      customer_name: "Emily Johnson",
      total: "$670",
      status: (
        <Badge className="w-fit" color="success">
          Completed
        </Badge>
      ),
      action: "See details",
    },
    {
      order_id: "220608D4RSLXYH",
      customer_name: "Michael Brown",
      total: "$234",
      status: (
        <Badge className="w-fit" color="failure">
          Cancelled
        </Badge>
      ),
      action: "See details",
    },
    {
      order_id: "220608E5VBTUZS",
      customer_name: "Sarah Davis",
      total: "$200",
      status: (
        <Badge className="w-fit" color="indigo">
          In progress
        </Badge>
      ),
      action: "See details",
    },
    {
      order_id: "220608F6KGQOWP",
      customer_name: "David Wilson",
      total: "$22.2",
      status: (
        <Badge className="w-fit" color="success">
          Completed
        </Badge>
      ),
      action: "See details",
    },
    {
      order_id: "220608D4RSLXYH",
      customer_name: "Tien Anh",
      total: "$20",
      status: (
        <Badge className="w-fit" color="success">
          Completed
        </Badge>
      ),
      action: "See details",
    },
  ];
  //   const data = [
  //     [
  //       "220608A1FNXWGT",
  //       "220608C2JMKPQV",
  //       "220608D4RSLXYH",
  //       "220608E5VBTUZS",
  //       "220608F6KGQOWP",
  //       "220608D4RSLXYH",
  //     ],
  //     [
  //       "John Smith",
  //       "Emily Johnson",
  //       "Michael Brown",
  //       "Sarah Davis",
  //       "David Wilson",
  //       "Tien Anh",
  //     ],
  //     ["$999", "$670", "$234", "$200", "$22.2", "$20"],
  //     [
  //       "Completed",
  //       "Completed",
  //       "Cancelled",
  //       "In progress",
  //       "Completed",
  //       "Completed",
  //     ],
  //     [
  //       "See details",
  //       "See details",
  //       "See details",
  //       "See details",
  //       "See details",
  //       "See details",
  //     ],
  //   ];

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
            dropdownLabel={"Order ID"}
          />
          <Button>Reset</Button>
        </div>
      </div>
      <CustomTable headers={headers} data={data} />
    </div>
  );
}
