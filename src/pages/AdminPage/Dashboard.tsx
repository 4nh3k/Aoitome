import AnalysisDataBox from '../../components/AdminComponents/AnalysisDataBox'
import PieChart from '../../components/AdminComponents/Charts/DonutChart'
import BarChart from '../../components/AdminComponents/Charts/BarChart'
import CustomTable from '../../components/CustomTable'

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
    <div className=' bg-gray-50 mt-5 flex flex-col gap-4 px-3 '>
    <div className='flex items-start gap-3 overflow-x-hidden self-stretch'>
        <AnalysisDataBox label={'Revenue'} value={'$10,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Books'} value={'20,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Orders'} value={'5,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Customers'} value={'1,000'}></AnalysisDataBox>
    </div>
    <div className='flex flex-wrap overflow-hidden'>
      <BarChart></BarChart>
      <PieChart></PieChart>
    </div>
    <CustomTable headers={headers} data={data}></CustomTable>
    </div>
    
  )
}

export default AdminDashboard