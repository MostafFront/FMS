import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import StationFinance from '../StationFinance/StationFinance';
import StationOperation from '../StationOperation/StationOperation';
import DashboardGraphBar from '../DashboardGraphBar/DashboardGraphBar';
import { Link } from 'react-router-dom';

export default function FinanceOperation() {
    const [activeTab, setActiveTab] = useState('Finance');
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    const handleTabToggle = (tab) => {
        setActiveTab(tab);
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    return (
        <>
            <SideBar />
            <div className='absolute top-0 right-0 xl:h-auto 2xl:h-full w-[95%] bg-[#F9F5F3] flex flex-col'>
                <div className='flex justify-between items-center bg-[#FFFFFF] mb-2 h-auto'>
                    <div className='flex gap-3 text-[#3D5161] py-3 px-5'>
                        <i className="fa-solid fa-car-tunnel text-3xl"></i>
                        <p className='font-medium text-xl'>Station Name Compressor</p>
                    </div>
                    <Link to={'/DashboardGraph'} className='rounded-l-lg text-xl bg-[#FF7F5C] text-[#FFFFFF] flex items-center justify-center gap-5 w-[10%] py-3 px-10'>
                        Back
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                </div>
                <DashboardGraphBar selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
                <div className='flex justify-between items-center bg-[#FFFFFF] my-2 h-auto'>
                    <button 
                        onClick={() => handleTabToggle('Finance')}
                        className={`text-2xl text-[#3D5161] flex items-center justify-center pl-10 w-[45%] p-2 ${activeTab === 'Finance' ? 'border-b-4 border-[#FF7F5C]' : ''}`}
                    >
                        Finance
                    </button>
                    <button 
                        onClick={() => handleTabToggle('Operation')}
                        className={`text-2xl text-[#3D5161] flex items-center justify-center w-[45%] p-2 ${activeTab === 'Operation' ? 'border-b-4 border-[#FF7F5C]' : ''}`}
                    >
                        Operation
                    </button>
                </div>
                {activeTab === 'Finance' ? (
                    <StationFinance selectedPeriod={selectedPeriod} />
                ) : (
                    <StationOperation />
                )}
            </div>
        </>
    );
}
