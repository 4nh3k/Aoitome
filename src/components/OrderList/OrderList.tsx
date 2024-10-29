import SearchInput from "@/components/SearchInput/SearchInput";
import { Button, Datepicker, Pagination } from "flowbite-react";
import CustomTable from "../CustomTable";
import { useState } from "react";

export interface RowData {
  order_id: number;
  customer_name: string;
  total: number;
  status: JSX.Element;
  order_date: string;
  action: string;
}
interface OrderListProps {
  data: RowData[];
}

const OrderList: React.FC<OrderListProps> = (props) => {
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
      label: "Order Date",
      prop: "order_date",
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
      className: "text-center justify-items-center",
    },
    {
      label: "Action",
      prop: "action",
      className:
        "text-blue-700 text-xs font-medium  text-center hover:cursor-pointer",
    },
  ];

  const [currentData, setCurrentData] = useState(props.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(6);
  const totalPages = Math.ceil((props.data.length ?? 0) / currentPageSize);
  const start = (currentPage - 1) * currentPageSize;
  const end = start + currentPageSize;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleFilterOrderDate = (e) => {
    setCurrentPage(1);
    setCurrentData(
      props.data.filter((row) => {
        console.log("Order date row: ", new Date(row.order_date));
        console.log("Selected date: ", selectedDate);
        console.log(
          "Compare result: ",
          new Date(row.order_date).toLocaleDateString(),
          selectedDate.toLocaleDateString()
        );
        return (
          new Date(row.order_date).toLocaleDateString() ===
          selectedDate.toLocaleDateString()
        );
      }).slice(start, end)
    );
  };
  
  const [searchOrderId, setSearchOrderId] = useState('');

  const onChangeSearchTerm = (searchTerm: string) => {
    setSearchOrderId(searchTerm);
  };

  const handleFilterOrderId = (e) => {
    setCurrentPage(1);
    setCurrentData(
      props.data.filter((row) => {
        return (
          row.order_id.toString().includes(searchOrderId)
        );
      }).slice(start, end)
    );
  }

  const handleReset = (e) => {
    setSearchOrderId('');
    setCurrentPage(1);
    setCurrentData(props.data.slice(0, currentPageSize));
  }

  return (
    <div className="flex flex-col justify-between gap-8 focus:ring-0">
      <div className="flex justify-between w-full">
        <div className="flex space-x-2 items-center">
          <span>Order Date</span>
          <Datepicker
            language="vn"
            data-datepicker-format="yyyy-MM-dd"
            placeholder="Select date"
            value={selectedDate.toLocaleDateString().split("T")[0]}
            onSelectedDateChanged={handleDateChange}
          />
          <Button onClick={handleFilterOrderDate}>Filter</Button>
        </div>
        <div className="flex w-1/2 space-x-2 items-center ">
          <SearchInput
            className="w-full border-1 border-gray-300 border-sm rounded-l-sm rounded-r-lg p-0 focus-within:[&:has(input:focus)]:border-blue-500 overflow-hidden"
            
            placeholder={"Order ID"}
            dropdownList={["Order ID"]}
            onSubmit={handleFilterOrderId}
            onChange={onChangeSearchTerm}
          />
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
      <CustomTable headers={headers} data={currentData.slice(start, end)} />
      {totalPages >= 1 && (
        <Pagination
          className="justify-self-end ml-auto"
          currentPage={currentPage}
          onPageChange={function (page: number): void {
            setCurrentPage(page);
          }}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default OrderList