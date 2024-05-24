import AnalysisDataBox from '../../../components/AdminComponents/AnalysisDataBox'
import BarChart from '../../../components/AdminComponents/Charts/RevenueBarChart'
import CustomTable from '../../../components/CustomTable'
import { useQuery } from '@tanstack/react-query'
import { orderingApi } from '../../../apis/ordering.api'
import { bookApi } from '../../../apis/book.api'
import { Pagination } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Transaction } from '../../../types/Models/Ordering/OrderModel/Transaction.type'
import RevenueBarChart from '../../../components/AdminComponents/Charts/RevenueBarChart'
import TopProductCharts from '../../../components/AdminComponents/Charts/TopProductsChart'
import { Fade } from 'react-awesome-reveal'

const AdminDashboard = () => {
  const headers = [
    {
      label: 'TRANSACTION ID',
      prop: 'id',
      className: 'font-normal'
    },
    {
      label: 'BUYER ID',
      prop: 'buyerId',
    },
    {
      label: 'DATE & TIME',
      prop: 'createdAt',
    },
    {
      label: 'AMOUNT',
      prop: 'totalAmount',
      className: 'font-bold'
    },
    {
      label: 'STATUS',
      prop: 'status',
    }
  ];

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [transactionsInPage, setTransactionInPage] = useState<Transaction[]>();

  const { data: transactionData, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ['transactions', { pageIndex, pageSize }],
    queryFn: ({ signal }) => {
      return orderingApi.getTransactionByPage(pageIndex - 1, pageSize);
    }
  });

  useEffect(() => {
    if (!isLoadingTransaction) {
      const transactions = transactionData?.data.data;
      setTransactionInPage(transactions);
      const totalTransactions = transactionData?.data.totalItems;
      setTotalItems(totalTransactions);
    }
  })

  const { data: reportData, isLoading: isLoadingReport } = useQuery({
    queryKey: ['report'],
    queryFn: () => {
      return orderingApi.getReportMetrics();
    }
  });

  const { data: booksData, isLoading: isLoadingBook } =
    useQuery({
      queryKey: ['books'],
      queryFn: () => {
        return bookApi.getBookByPage(0, 12);
      }
    })

  const handlePageChange = (e: number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  }

  const report = reportData?.data;
  const totalBooks = booksData?.data.totalItems;

  return (
    <div className=' bg-background mt-5 flex w-full flex-col gap-4'>

      <span className='heading-4'>Key metrics</span>
      <Fade triggerOnce={true}>
        <div className='flex items-start gap-8 overflow-x-hidden'>
          <AnalysisDataBox label={'Books'} value={booksData !== undefined ? `${totalBooks}` : "0"}></AnalysisDataBox>
          <AnalysisDataBox label={'Revenue'} value={report !== undefined ? `${report.totalRevenue}` : "0"}></AnalysisDataBox>
          <AnalysisDataBox label={'Orders'} value={report !== undefined ? `${report.orderCount}` : "0"}></AnalysisDataBox>
          <AnalysisDataBox label={'Customers'} value={report !== undefined ? `${report.customerCount}` : "0"}></AnalysisDataBox>
        </div>
      </Fade>


      <span className='heading-4'>Sale revenue</span>
      <Fade triggerOnce={true}>
        <div className='w-full flex flex-row justify-between pb-6'>
          <RevenueBarChart />
        </div>
      </Fade>
      <Fade triggerOnce={true}>
        <span className='heading-4'>Top products</span>
        <div className='w-full flex flex-row justify-between pb-6'>
          <TopProductCharts />
        </div>
      </Fade>
      <span className='heading-4'>Transaction history</span>

      {!isLoadingTransaction && transactionsInPage && <Fade triggerOnce={true}><CustomTable headers={headers} data={transactionsInPage.map((transaction) => {
        return {
          id: transaction.id,
          buyerId: transaction.buyerId,
          createdAt: transaction.createdAt,
          totalAmount: transaction.totalAmount,
          status: transaction.status
        }
      })}></CustomTable></Fade>}

      <div className='text-right'>
        <Pagination currentPage={pageIndex} onPageChange={handlePageChange} totalPages={Math.ceil(totalItems / pageSize)} />
      </div>
    </div>

  )
}

export default AdminDashboard