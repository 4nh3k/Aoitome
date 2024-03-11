import React from 'react'

export default function Header() {
    return (
        <>
            <div className="w-96 h-24 py-6 bg-white border-t border-b border-gray-200 flex-col justify-center items-center inline-flex">
                <div className="w-96 justify-start items-center gap-8 inline-flex">
                    <div className="justify-start items-center gap-1.5 flex">
                        <div className="w-8 h-8 relative">
                            <div className="w-4 h-5 left-[10.83px] top-[4.45px] absolute">
                            </div>
                            <div className="w-7 h-7 left-[0.79px] top-[4.59px] absolute">
                            </div>
                        </div>
                        <div><span className="text-blue-700 text-2xl font-semibold font-['Inter'] leading-9">Aoi</span><span className="text-gray-900 text-2xl font-semibold font-['Inter'] leading-9">tome</span></div>
                    </div>
                    <div className="grow shrink basis-0 h-9 justify-start items-start flex">
                        <div className="px-5 py-2 bg-gray-100 rounded-tl-lg rounded-bl-lg border border-gray-300 justify-center items-center gap-2 flex">
                            <div className="text-gray-900 text-sm font-medium font-['Inter'] leading-tight">All categories</div>
                            <div className="w-5 h-5 relative" />
                        </div>
                        <div className="grow shrink basis-0 h-9 px-2.5 py-2 bg-gray-50 border border-gray-300 justify-start items-start flex">
                            <div className="justify-start items-start flex">
                                <div className="grow shrink basis-0 text-gray-500 text-sm font-normal font-['Inter'] leading-tight">Search Mockups, Logos, Design Themes...</div>
                            </div>
                        </div>
                        <div className="w-10 self-stretch p-2 bg-blue-700 rounded-tr-lg rounded-br-lg border border-blue-700 justify-center items-center flex">
                            <div className="w-5 h-5 relative" />
                        </div>
                    </div>
                    <div className="justify-start items-center gap-4 flex">
                        <div className="w-28 h-10 relative">
                            <div className="w-28 h-10 py-2.5 left-0 top-0 absolute bg-white rounded-lg justify-center items-center gap-2 inline-flex">
                                <div className="w-5 h-5 relative bg-white" />
                                <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight">Notification</div>
                            </div>
                            <div className="w-1.5 h-1.5 left-[14px] top-[12px] absolute bg-red-500 rounded-full" />
                        </div>
                        <div className="py-0.5 flex-col justify-start items-start gap-3.5 inline-flex">
                            <div className="py-2.5 bg-white rounded-lg justify-center items-center gap-2 inline-flex">
                                <div className="w-5 h-5 relative bg-white" />
                                <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight">My Cart</div>
                            </div>
                        </div>
                        <div className="py-2.5 bg-white rounded-lg justify-center items-center gap-2 flex">
                            <div className="w-5 h-5 relative" />
                            <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight">Account</div>
                            <div className="w-5 h-5 relative" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
