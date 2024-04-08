import AdminInput from "../../../components/AdminComponents/Input/AdminInput"
import AdminTextArea from "../../../components/AdminComponents/Input/AdminTextArea"
import AdminDropdown from "../../../components/AdminComponents/Input/AdminDropdown";
import DatepickerInput from "../../../components/AdminComponents/Input/DatepickerInput";
import InfoOutline from "../../../assets/icon/info-outline.svg"
import MinusOutline from "../../../assets/icon/minus-outline.svg"
import PlusOutline from "../../../assets/icon/plus-outline.svg"
import XOutline from "../../../assets/icon/x-outline.svg"
import LineSeparator from "../../../assets/icon/line.svg"
import ChevronDown from "../../../assets/icon/chevron-down.svg"
import HorizontalSeparator from "../../../assets/icon/horizontal-separator.svg"
import Button from "../../../components/Button/Button";
import { IconBaseProps } from "react-icons";

const BookDetail = () => {
    const languageCodes = ['en', 'jpn', 'vn'];
    const publishers = ['Lorem Ipsum'];
    const formats = ['Hardcover', 'Paperback'];

    return (
        <div className='bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm'>

            <div className="flex flex-col pt-4 pb-5 px-4 justify-between items-start gap-5">
                <span className="heading-4">Book detail</span>
                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <AdminInput title={"Title"} placeholder={"Enter title"} />
                    <AdminInput title={"Title without series"} placeholder={"Enter title without series"} />
                </div>
                <div className="flex w-full flex-wrap items-stretch justify-between">
                    <AdminInput title={"Discount percentage"} placeholder={"50%"} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between">
                    <AdminTextArea title={"Description"} placeholder={"Enter description here"} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <AdminInput title={"Number of pages"} placeholder={"300"} />
                    <AdminInput title={"Author"} placeholder={"Rapi Redhood"} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <DatepickerInput title='Publication date' />
                    <AdminDropdown title='Language code' items={languageCodes} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <AdminInput title={"Price"} placeholder={"$4.99"} />
                    <AdminInput title={"Availability"} placeholder={"100"} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
                        <div className="flex flex-start gap-2 self-stretch">
                            <div className="flex items-center gap-[1.5rem] flex-1 self-stretch">
                                <span className="text-sm font-medium leading-5">Dimensions</span>
                                <img src={InfoOutline} width={12} height={12} />

                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[20px] h-[20px] flex-shrink-0 rounded border-1 border-gray-300 border-solid">
                                    <img src={MinusOutline} width={20} height={20} className="flex-shrink-0 mx-auto my-auto" />
                                </div>
                                <span className="text-sm font-medium leading-4">3</span>
                                <div className="w-[20px] h-[20px] flex-shrink-0 rounded border-1 border-gray-300 border-solid">
                                    <img src={PlusOutline} width={20} height={20} className="flex-shrink-0 mx-auto my-auto" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-6 items-center self-stretch">
                            <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                                <input className="bg-gray-50 flex text-sm w-[52.5px] font-normal leading-5 outline-none " placeholder="2.2"></input>
                            </div>
                            <span className="text-sm font-medium leading-4">x</span>
                            <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                                <input className="w-[52.5px] bg-gray-50 flex  text-sm font-normal leading-5 outline-none " placeholder="2.2"></input>
                            </div>
                            <span className="text-sm font-medium leading-4">x</span>
                            <div className="flex  px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                                <input className="bg-gray-50 flex  text-sm w-[52.5px] font-normal leading-5 outline-none " placeholder="2.2"></input>
                            </div>
                            <span className="text-sm font-medium leading-4">inches</span>
                        </div>
                    </div>
                    <AdminInput title={"Item weight"} placeholder={"2.41"} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <AdminInput title={"Average rating"} placeholder={"7.0"} />
                    <AdminInput title={"Rating count"} placeholder={"1000"} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <AdminDropdown title='Publishers' items={publishers} />
                    <AdminDropdown title='Format' items={formats} />
                </div>

                <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
                    <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
                        <span className="text-sm font-medium leading-5">Genres</span>
                        <div className="flex py-5 px-4 items-center gap-4 self-strech rounded-xl border-1 border-solid border-primary bg-white w-full">
                        <div className="flex flex-grow items-center gap-4 flex-1">
                            <div className="flex flex-grow items-center gap-4 flex-1">
                                <div className="flex w-[10rem] py-2 px-4 items-center rounded-lg border-solid border-1 border-gray-300 bg-gray-50 gap-4">
                                    <span className="text-sm font-normal leading-5">Epic Fantasy</span>
                                    <img src={XOutline} width={12} height={12} className="flex-shrink-0"></img>
                                </div>

                                <div className="flex w-[10rem] py-2 px-4 items-center rounded-lg border-solid border-1 border-gray-300 bg-gray-50 gap-3">
                                    <span className="text-sm font-normal leading-5">Epic Fantasy</span>
                                    <img src={XOutline} width={12} height={12} className="flex-shrink-0"></img>
                                </div>

                                <div className="flex w-[10rem]  py-2 px-4 items-center rounded-lg border-solid border-1 border-gray-300 bg-gray-50 gap-3">
                                    <span className="text-sm font-normal leading-5">Epic Fantasy</span>
                                    <img src={XOutline} width={12} height={12} className="flex-shrink-0"></img>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={XOutline} width={12} height={12} />
                                <img src={LineSeparator} className="h-fit" />
                                <img src={ChevronDown} width={12} height={12} />
                            </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <img src={HorizontalSeparator} className="w-full" />
            </div>
        </div>
    )
}

export default BookDetail