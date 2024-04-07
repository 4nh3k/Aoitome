import AnalysisDataBox from '../../components/AdminComponents/AnalysisDataBox'
import PieChart from '../../components/AdminComponents/Charts/DonutChart'
import BarChart from '../../components/AdminComponents/Charts/BarChart'

const AdminDashboard = () => {
  return (
    <div className='min-h-screen w-full bg-gray-50 mt-5 flex flex-col items-strech gap-4 overflow-x-hidden'>
    <div className='flex items-start gap-3 justify-self-strech overflow-x-hidden'>
        <AnalysisDataBox label={'Revenue'} value={'$10,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Books'} value={'20,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Orders'} value={'5,000'}></AnalysisDataBox>
        <AnalysisDataBox label={'Customers'} value={'1,000'}></AnalysisDataBox>
    </div>
    <div className='flex flex-wrap items-stretch justify-between gap-4'>
      <BarChart></BarChart>
      <PieChart></PieChart>
    </div>
    <div className='flex flex-wrap items-stretch justify-between gap-4'>
      <BarChart></BarChart>
      
    </div>
    </div>
    
  )
}

export default AdminDashboard