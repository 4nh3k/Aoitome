// package import
import { Fade } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
// api import
import { orderingApi } from "@/apis/ordering.api";
import { bookApi } from "@/apis/book.api";
// type import
import { Transaction } from "@/types/Models/Ordering/OrderModel/Transaction.type";
// components import
import RevenueBarChart from "@/components/AdminComponents/Charts/RevenueBarChart";
import TopProductCharts from "@/components/AdminComponents/Charts/TopProductsChart";
import AnalysisDataBox from "@/components/AdminComponents/AnalysisDataBox";
import CustomTable from "@/components/CustomTable";

const AdminDashboard = () => {
  const headers = [
    {
      label: "TRANSACTION ID",
      prop: "id",
      className: "font-normal",
    },
    {
      label: "BUYER ID",
      prop: "buyerId",
    },
    {
      label: "DATE & TIME",
      prop: "createdAt",
    },
    {
      label: "AMOUNT",
      prop: "totalAmount",
      className: "font-bold",
    },
    {
      label: "STATUS",
      prop: "status",
    },
  ];

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(7);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [transactionsInPage, setTransactionInPage] = useState<Transaction[]>();

  const { data: transactionData, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transactions", { pageIndex, pageSize }],
    queryFn: ({}) => {
      return orderingApi.getTransactionByPage(pageIndex - 1, pageSize);
    },
  });

  useEffect(() => {
    if (!isLoadingTransaction) {
      const transactions = transactionData?.data.data;
      setTransactionInPage(transactions);
      const totalTransactions = transactionData?.data.totalItems ?? 0;
      setTotalItems(totalTransactions);
    }
  });

  const { data: reportData } = useQuery({
    queryKey: ["report"],
    queryFn: () => {
      return orderingApi.getReportMetrics();
    },
  });

  const { data: booksData } = useQuery({
    queryKey: ["books"],
    queryFn: () => {
      return bookApi.getBookByPage(0, 12);
    },
  });

  const handlePageChange = (e: number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  };

  const report = reportData?.data;
  const totalBooks = booksData?.data.totalItems;

  return (
    <div className=" bg-background mt-5 mb-2 flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
      <span className="heading-5">Key metrics</span>
      <Fade triggerOnce={true}>
        <div className="flex items-start gap-8 overflow-x-hidden">
          <AnalysisDataBox
            label={"Books"}
            value={booksData !== undefined ? `${totalBooks}` : "0"}
          ></AnalysisDataBox>
          <AnalysisDataBox
            label={"Revenue"}
            value={report !== undefined ? `${report.totalRevenue}` : "0"}
          ></AnalysisDataBox>
          <AnalysisDataBox
            label={"Orders"}
            value={report !== undefined ? `${report.orderCount}` : "0"}
          ></AnalysisDataBox>
          <AnalysisDataBox
            label={"Customers"}
            value={report !== undefined ? `${report.customerCount}` : "0"}
          ></AnalysisDataBox>
        </div>
      </Fade>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col w-2/5 justify-between">
          <div className="">
            <span className="heading-5 block mb-2">Sale revenue</span>
            <Fade className="" triggerOnce={true}>
              <RevenueBarChart />
            </Fade>
          </div>
          <div className="">
            <span className="heading-5 block mb-2">Top products</span>
            <Fade className="" triggerOnce={true}>
              <TopProductCharts />
            </Fade>
          </div>
        </div>
        <div className="flex flex-col w-3/5 justify-between">
          <div className="flex flex-col">
            <span className="heading-5 mb-2">Transaction history</span>
            {!isLoadingTransaction && transactionsInPage && (
              <Fade triggerOnce={true}>
                <CustomTable
                  headers={headers}
                  data={transactionsInPage.map((transaction) => {
                    return {
                      id: transaction.id,
                      buyerId: transaction.buyerId,
                      createdAt: transaction.createdAt,
                      totalAmount: transaction.totalAmount,
                      status: transaction.status,
                    };
                  })}
                ></CustomTable>
              </Fade>
            )}
          </div>
          <div className="text-right">
            <Pagination
            className="mt-2"
              currentPage={pageIndex}
              onPageChange={handlePageChange}
              totalPages={Math.ceil(totalItems / pageSize)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
