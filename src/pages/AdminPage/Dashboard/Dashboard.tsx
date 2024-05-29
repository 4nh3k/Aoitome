import AnalysisDataBox from '../../../components/AdminComponents/AnalysisDataBox'
import CustomTable from '../../../components/CustomTable'
import RevenueChart from '../../../components/AdminComponents/Charts/RevenueBarChart'
import { useQuery } from '@tanstack/react-query'
import orderApi from '../../../apis/order.api'
import { useState } from 'react'
import productApi from '../../../apis/product.api'
import userApi from '../../../apis/user.api'
import { Fade } from 'react-awesome-reveal'


const USER_ROLE_ID = '10ebc6bb-244f-4180-8804-bb1afd208866'

const AdminDashboard = () => {
  const headers = [
    {
      label: 'ID',
      prop: 'id',
      className: 'font-normal'
    },
    {
      label: 'User ID',
      prop: 'userId',
      className: 'font-normal'
    },
    {
      label: 'Order Status',
      prop: 'orderStatus',
      className: 'font-normal'
    },
    {
      label: 'Create Date',
      prop: 'createDate',
      className: 'font-normal w-fit'
    },
    {
      label: 'Payment Method',
      prop: 'paymentMethod',
      className: 'font-normal'
    },
    {
      label: 'Total Price',
      prop: 'totalPrice',
      className: 'font-normal'
    },
    {
      label: 'Shipping status',
      prop: 'shippingStatus',
      className: 'font-normal'
    },
    {
      label: 'Delivery information',
      prop: 'information',
      className: 'font-normal'
    }
  ];
  const data = []

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1000);

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, pageSize],
    queryFn: () => {
      return orderApi.getAllOrders(pageIndex, pageSize)
    }
  });

  const { data: productData, isLoadingProducts } = useQuery({
    queryKey: ['products', pageIndex, pageSize],
    queryFn: () => {
      return productApi.getAllProducts(pageIndex, pageSize)
    }
  });

  const { data: userData, isLoadingUserData } = useQuery({
    queryKey: ['customers', pageIndex, pageSize],
    queryFn: () => {
      return userApi.getUserByRole(USER_ROLE_ID)
    }
  })

  return (
    <div className=' bg-background mt-5 flex w-full flex-col gap-4'>

      <span className='heading-4'>Key metrics</span>

      <Fade triggerOnce={true}>
      <div className='flex items-start gap-8 overflow-x-hidden'>
        <AnalysisDataBox label={'Products'} value={productData?.data.result?.length}></AnalysisDataBox>
        <AnalysisDataBox label={'Orders'} value={ordersData?.data.result?.length}></AnalysisDataBox>
        <AnalysisDataBox label={'Customers'} value={userData?.data.result?.count}></AnalysisDataBox>
      </div>
      </Fade>

      <span className='heading-4'>Sale revenue & Demographic</span>
      <Fade triggerOnce={true}>
      <div className='w-full flex flex-row justify-between'>

        <RevenueChart />
      </div>
      </Fade>
      <span className='heading-4'>Transaction history</span>

      {!isLoadingOrders && ordersData && <Fade triggerOnce={true}><CustomTable headers={headers} data={ordersData?.data.result?.map((order) => {
        return {
          id: order.id,
          userId: order.userId,
          orderStatus: order.orderStatus,
          createDate: new Date(order.createDate).toLocaleDateString(),
          paymentMethod: order.paymentMethod,
          totalPrice: order.totalPrice,
          shippingStatus: order.shipping.shippingStatus,
          information: order.shipping.delivery.information
        }
      })}></CustomTable></Fade>}
    </div>

  )
}

export default AdminDashboard