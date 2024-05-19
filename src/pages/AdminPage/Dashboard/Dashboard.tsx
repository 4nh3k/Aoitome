import AnalysisDataBox from '../../../components/AdminComponents/AnalysisDataBox'
import PieChart from '../../../components/AdminComponents/Charts/DonutChart'
import BarChart from '../../../components/AdminComponents/Charts/BarChart'
import CustomTable from '../../../components/CustomTable'
import { useQuery } from '@tanstack/react-query'
import { orderingApi } from '../../../apis/ordering.api'
import { bookApi } from '../../../apis/book.api'

const AdminDashboard = () => {
  const headers = [
    {
      label: 'TRANSACTION',
      prop: 'transaction',
      className: 'font-normal'
    },
    {
      label: 'DATE & TIME',
      prop: 'datetime',
    },
    {
      label: 'AMOUNT',
      prop: 'amount',
      className: 'font-bold'
    },
    {
      label: 'STATUS',
      prop: 'status',
    }
  ]

  const data = [
    {
      "transaction": 'Payment from Bonney Green',
      "datetime": "April 23, 2021",
      "amount": "$2300",
      "status": "Completed"
    },
    {
      "transaction": 'Payment from Bonney Green',
      "datetime": "April 23, 2021",
      "amount": "$2300",
      "status": "Completed"
    },
    {
      "transaction": 'Payment from Bonney Green',
      "datetime": "April 23, 2021",
      "amount": "$2300",
      "status": "Completed"
    },
    {
      "transaction": 'Payment from Bonney Green',
      "datetime": "April 23, 2021",
      "amount": "$2300",
      "status": "Completed"
    },
    {
      "transaction": 'Payment from Bonney Green',
      "datetime": "April 23, 2021",
      "amount": "$2300",
      "status": "Completed"
    }
  ]

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

  const report = reportData?.data;
  const totalBooks = booksData?.data.totalItems;

  return (
    <div className=' bg-background mt-5 flex w-full flex-col gap-4'>

      <span className='heading-4'>Key metrics</span>

      <div className='flex items-start gap-8 overflow-x-hidden'>
        <AnalysisDataBox label={'Books'} value={booksData !== undefined ? `${totalBooks}` : "0"}></AnalysisDataBox>
        <AnalysisDataBox label={'Revenue'} value={report !== undefined ? `${report.totalRevenue}` : "0"}></AnalysisDataBox>
        <AnalysisDataBox label={'Orders'} value={report !== undefined ? `${report.orderCount}` : "0"}></AnalysisDataBox>
        <AnalysisDataBox label={'Customers'} value={report !== undefined ? `${report.customerCount}` : "0"}></AnalysisDataBox>
      </div>

      <span className='heading-4'>Sale revenue</span>

      <div className='w-full flex flex-row justify-between'>

        <BarChart></BarChart>
        {/* <PieChart></PieChart> */}
      </div>

      <span className='heading-4'>Transaction history</span>

      <CustomTable headers={headers} data={data}></CustomTable>
    </div>

  )
}

export default AdminDashboard