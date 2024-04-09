import InfoOutline from "../../../assets/icon/info-outline.svg"
import MinusOutline from "../../../assets/icon/minus-outline.svg"
import PlusOutline from "../../../assets/icon/plus-outline.svg"
const DimensionInput = () => {
  return (
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
  )
}

export default DimensionInput