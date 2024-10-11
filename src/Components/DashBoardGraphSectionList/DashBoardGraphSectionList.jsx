import React from 'react'

export default function DashBoardGraphSectionList() {

    const data = [
        {
          stationName: "Station Name Dummy",
          totalSales: 62721,
          totalValues: 550,
          compressionState: "Compression",
          totalTransactionCount: 5161,
          maxTransactionPerHour: 20,
          maxTransactionDateTime: "8-1-2021 | 10:16 PM",
        },{
            stationName: "Station Name Dummy",
            totalSales: 62721,
            totalValues: 550,
            compressionState: "Compression",
            totalTransactionCount: 5161,
            maxTransactionPerHour: 20,
            maxTransactionDateTime: "8-1-2021 | 10:16 PM",
          },{
            stationName: "Station Name Dummy",
            totalSales: 62721,
            totalValues: 550,
            compressionState: "Compression",
            totalTransactionCount: 5161,
            maxTransactionPerHour: 20,
            maxTransactionDateTime: "8-1-2021 | 10:16 PM",
          },
    ];


  return (
    <>
      <div className='flex flex-col p-3 w-full gap-y-5 overflow-auto max-h-80 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
        {data.map((station, index) => (
            <div key={index} className='flex justify-center items-center bg-[#FFFFFF] p-4 rounded-md flex-col gap-y-5'>
            <div className='flex justify-between items-end gap-3 w-full border-b-2 border-[#E0E7F1] pb-2'>
                <div className='flex justify-center items-end gap-1'>
                <span className='p-1 mr-1 rounded-full bg-[#FF7F5C]'></span>
                <i className="fa-solid fa-car-tunnel text-4xl text-[#FF7F5C]"></i>
                <p className='font-bold text-lg text-[#3D5161]'>{station.stationName}</p>
                </div>
                <i className="fa-solid fa-ellipsis text-[#3D5161]"></i>
            </div>
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col items-start gap-y-7 w-[30%]'>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-medium text-xs capitalize text-[#3D5161]'>total sales</p>
                    <p className='font-medium text-xs text-[#8D8F96]'>{station.totalSales} <span className='ml-2'>m <sup>3</sup></span></p>
                </div>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-medium text-xs capitalize text-[#3D5161]'>total values</p>
                    <p className='font-medium text-xs text-[#8D8F96]'>{station.totalValues} <span className='ml-2 uppercase'>egp</span></p>
                </div>
                </div>
                <div className='flex flex-col items-start gap-y-7 w-[30%]'>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-medium text-xs capitalize text-[#3D5161]'>Compression State</p>
                    <p className='font-medium text-xs text-[#8D8F96]'>{station.compressionState}</p>
                </div>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-medium text-xs capitalize text-[#3D5161]'>Total Transaction Count</p>
                    <p className='font-medium text-xs text-[#8D8F96]'>{station.totalTransactionCount}</p>
                </div>
                </div>
                <div className='flex flex-col items-start gap-y-7 w-[30%]'>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-medium text-xs capitalize text-[#3D5161]'>Max Transaction / hour</p>
                    <p className='font-medium text-xs text-[#8D8F96]'>{station.maxTransactionPerHour}</p>
                </div>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-medium text-xs capitalize text-[#3D5161]'>Max Transaction Date-Time</p>
                    <p className='font-medium text-xs text-[#8D8F96]'>{station.maxTransactionDateTime}</p>
                </div>
                </div>
            </div>
            </div>
        ))}         
      </div>
    </>
  )
}
