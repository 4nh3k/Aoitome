import AnalysisDataBox from '../../../components/AdminComponents/AnalysisDataBox'
import PieChart from '../../../components/AdminComponents/Charts/DonutChart'
import BarChart from '../../../components/AdminComponents/Charts/BarChart'
import CustomTable from '../../../components/CustomTable'

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

  return (
    <div className=' bg-background mt-5 flex w-full flex-col gap-4'>

      <span className='heading-4'>Key metrics</span>

      <div className='flex items-start gap-8 overflow-x-hidden'>
        <AnalysisDataBox label={'Revenue'} value={'$10,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Books'} value={'20,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Orders'} value={'5,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Customers'} value={'1,000'}></AnalysisDataBox>
      </div>

      <span className='heading-4'>Sale revenue & Demographic</span>

      <div className='w-full flex flex-row justify-between'>

        <BarChart></BarChart>
        <PieChart></PieChart>
      </div>

      <span className='heading-4'>Transaction history</span>

      <CustomTable headers={headers} data={data}></CustomTable>
    </div>

  )
}

export default AdminDashboard