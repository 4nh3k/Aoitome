import SearchInput from '../../components/SearchInput'
import { Pagination, Select } from 'flowbite-react'
import { ProductList } from "../../assets/mockdata";
import Product from '../../components/Product';
const BookGridPage = () => {
    const dropdownList = ['Price (Low to High)'];
    return (
        <div className='bg-white flex flex-col pt-5 px-4 pb-4 flex-start flex-shrink-0 min-h-screen gap-6'>
            <span className='text-[1.5rem] font-bold'>Book</span>
            <div className='flex justify-between items-center self-stretch'>
                <SearchInput className={''} placeholder={'Search book'} dropdownList={[]} dropdownLabel={''}></SearchInput>
                <div className='flex justify-end items-center gap-3'>
                    <span className='text-[1rem] font-normal'>
                        Sort by
                    </span>
                    <Select required >
                        {dropdownList.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </Select>
                </div>

            </div>
            <div className="grid grid-cols-5 gap-11 ">
                {ProductList.map((product) => (
                    <Product
                        title={product.title}
                        imageURL={product.imageURL}
                        price={product.price}
                        rating={product.rating}
                        discount={product.discount}
                        totalRating={product.totalRating}
                    />
                ))}
            </div>
            <Pagination className='m-auto'currentPage={0} onPageChange={function (): void {
                throw new Error('Function not implemented.');
            } } totalPages={3}></Pagination>
        </div>
    )
}

export default BookGridPage