import React from 'react'

export default function DashboardGraphBar({ selectedPeriod, onPeriodChange }) {
  return (
    <div className='h-[10%] w-full bg-[#FFFFFF]'>
      <div className="flex justify-between items-center w-full p-5">
        <div className='flex justify-start items-center gap-2' >
            <div className='flex justify-center items-end gap-1'>
                <span className='p-1 mr-1 rounded-full bg-[#FF7F5C]'></span>
                <i className="fa-solid fa-car-tunnel text-3xl"></i>  
            </div>
            <p className='font-medium text-2xl'>2/3</p>
            <p className='w-[10%] font-normal text-sm text-[#3D5161]'>Monitored stations</p>
        </div>
        <div className='flex justify-start items-center gap-2' >
            <div className='flex justify-center items-end gap-1'>
                <span className='p-1 mr-1 rounded-full bg-[#FF7F5C]'></span>
                <i className="fa-solid fa-rotate-right text-3xl"></i>  
            </div>
            <p className='font-medium text-2xl'>20s</p>
            <p className='w-[10%] font-normal text-sm'>Last Update</p>
        </div>
        <div className='bg-[#c3c3c2] flex justify-center items-center gap-2 rounded-2xl'>
            <button
                className={`px-5 py-1 rounded-2xl font-medium text-sm uppercase ${selectedPeriod === 'today' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'bg-transparent text-[#3D5161]'}`}
                onClick={() => onPeriodChange('today')}
            >
                today
            </button>
            <button
                className={`px-5 py-1 rounded-2xl font-medium text-sm uppercase ${selectedPeriod === 'yesterday' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'bg-transparent text-[#3D5161]'}`}
                onClick={() => onPeriodChange('yesterday')}
            >
                yesterday
            </button>
            <button
                className={`px-5 py-1 rounded-2xl font-medium text-sm uppercase ${selectedPeriod === 'last week' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'bg-transparent text-[#3D5161]'}`}
                onClick={() => onPeriodChange('last week')}
            >
                last week
            </button>
        </div>
        <div className='flex justify-center items-center gap-x-2'>
            <span className='p-1.5 mr-1 bg-[#FF7F5C]'></span>
            <div className='flex justify-between items-center border-b-2 border-black pb-2 gap-x-10'>
                <p className='text-[#3D5161] text-sm'>
                    <span className='font-medium pr-2'>Start</span>
                    Date-Time
                </p>
                <i className="fa-regular fa-calendar-days"></i>
            </div>
        </div>
        <div className='flex justify-center items-center gap-x-2'>
            <span className='p-1.5 mr-1 bg-[#FF7F5C]'></span>
            <div className='flex justify-between items-center border-b-2 border-black pb-2 gap-x-10'>
                <p className='text-[#3D5161] text-sm'>
                    <span className='font-medium pr-2'>End</span>
                    Date-Time
                </p>
                <i className="fa-regular fa-calendar-days"></i>
            </div>
        </div>
      </div>
    </div>
  )
}
