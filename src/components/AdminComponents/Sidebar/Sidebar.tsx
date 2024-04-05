import PieChart from '../../../assets/icon/chart-pie-outline.svg';
import User from '../../../assets/icon/user.svg';
import Book from '../../../assets/icon/book-outline.svg';
import Bag from '../../../assets/icon/bag.svg';
import Message from '../../../assets/icon/messages-outline.svg';
import Voucher from '../../../assets/icon/inbox-full-outline.svg';
import SidebarItem from './SidebarItem';
import SidebarCollapse
 from './SidebarCollapse';
const Sidebar = () => {
  const bookSidebarItems = ['All books', 'Add book', 'All genres', 'All publishers', 'All athors'];

  const orderSidebarItems = ['Order list', 'Cancel order', 'Refund order'];

  const customerServiceSidebarItems = ['Chat log']
  return (
    <div className='flex w-[15.625rem] items-start bg-white'>
      <div className='flex flex-col min-h-screen items-start gap-6 flex-1'>
        <div className='flex flex-col items-stretch gap-1 px-4 py-3 font-medium flex-wrap'>
          <SidebarItem imageSrc={PieChart} label={'Dashboard'}></SidebarItem>
          <SidebarItem imageSrc={User} label={'Account'}></SidebarItem>
          <SidebarCollapse imageSrc={Book} label={'Book Management'} items={bookSidebarItems}></SidebarCollapse>
          <SidebarCollapse imageSrc={Bag} label={'Order Management'} items={orderSidebarItems}></SidebarCollapse>
          <SidebarItem imageSrc={Voucher} label={'Voucher Management'}></SidebarItem>
          <SidebarCollapse imageSrc={Message} label={'Customer Service'} items={customerServiceSidebarItems}></SidebarCollapse>
        </div>
      </div>
    </div>
  )
}

export default Sidebar