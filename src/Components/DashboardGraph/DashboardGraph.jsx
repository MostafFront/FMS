import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useNavigate } from 'react-router-dom';
import DashBoardGraphSectionGraph from '../DashBoardGraphSectionGraph/DashBoardGraphSectionGraph';
import DashBoardGraphSectionList from '../DashBoardGraphSectionList/DashBoardGraphSectionList';
import DashboardGraphBar from '../DashboardGraphBar/DashboardGraphBar';
import SideBar from '../SideBar/SideBar';

const RadarChart = ({ selectedPeriod }) => {
    useEffect(() => {
        const seriesData = {
            today: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
            ],
            yesterday: [
                { name: 'Series 1', data: [60, 70, 20, 30, 90, 10] },
                { name: 'Series 2', data: [30, 20, 50, 60, 40, 30] },
                { name: 'Series 3', data: [40, 60, 80, 20, 30, 20] },
            ],
            'last week': [
                { name: 'Series 1', data: [70, 50, 60, 80, 90, 20] },
                { name: 'Series 2', data: [20, 40, 30, 70, 10, 90] },
                { name: 'Series 3', data: [50, 40, 60, 50, 70, 30] },
            ],
        };

        const options = {
            series: seriesData[selectedPeriod],
            chart: {
                height: 250,
                type: 'radar',
                dropShadow: { enabled: true, blur: 1, left: 1, top: 1 },
                toolbar: { show: false },
            },
            stroke: { width: 2 },
            fill: { opacity: 0.1 },
            markers: { size: 0 },
            yaxis: { stepSize: 20 },
            xaxis: {
                categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'],
            },
            legend: { show: false },
            tooltip: { enabled: false },
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [selectedPeriod]);

    return <div id="chart"></div>;
};

export default function DashboardGraph() {
    const [activeSection, setActiveSection] = useState('graph');
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const navigate = useNavigate();

    const handleStationClick = (station) => {
        navigate('/FinanceOperation', { state: { station } });
    };

    const handleButtonClick = (section) => {
        setActiveSection(section);
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    const stations = [
        { name: "Station A", volume: 62721, progress: 45 },
        { name: "Station B", volume: 50000, progress: 60 },
        { name: "Station C", volume: 80000, progress: 75 },
    ];

    const dataByPeriod = {
        today: { totalValue: 71235, totalSales: 20000, avgSales: 20000, transactionCount: 1234 },
        yesterday: { totalValue: 65000, totalSales: 18000, avgSales: 19000, transactionCount: 1100 },
        'last week': { totalValue: 80000, totalSales: 25000, avgSales: 21000, transactionCount: 1300 },
    };

    const graphDataByPeriod = {
        today: [10, 20, 30, 40],
        yesterday: [20, 10, 30, 50],
        'last week': [30, 40, 20, 10],
    };

    const { totalValue, totalSales, avgSales, transactionCount } = dataByPeriod[selectedPeriod];
    const graphData = graphDataByPeriod[selectedPeriod];

    return (
        <>
            <SideBar />
            <div className='h-full w-[95%] absolute right-0 bg-[#F9F5F3] xl:h-auto 2xl:h-full'>
                <DashboardGraphBar selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
                <div className='w-[100%] h-auto flex items-start rounded-md'>
                    <div className='flex items-start justify-around p-10 w-full'>
                        <div className='flex flex-col justify-center items-end gap-y-10 w-[70%]'>
                            <div className='flex justify-end items-end gap-x-7 w-full'>
                                <div className='flex justify-center items-start flex-col bg-[#F4DBD4] py-3 px-10 rounded-xl'>
                                    <div className='flex justify-center items-center gap-2 text-[#3D5161]'>
                                        <p className='font-medium text-xl'>{totalValue}</p>
                                        <p className='text-sm'>EGP</p>
                                    </div>
                                    <p className='text-sm font-medium text-[#3D5161]'>Total Value</p>
                                    <div className='flex justify-center items-center gap-x-1 text-[#FF7F5C]'>
                                        <i className="fa-solid fa-circle-arrow-down text-sm"></i>
                                        <p className=''>2%</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-start flex-col bg-[#FFFFFF] py-3 px-10 rounded-xl'>
                                    <div className='flex justify-center items-center gap-2 text-[#3D5161]'>
                                        <p className='font-medium text-xl'>{totalSales}</p>
                                        <p className='text-sm'>m<sup>3</sup></p>
                                    </div>
                                    <p className='text-sm font-medium text-[#3D5161]'>Total Sales</p>
                                    <div className='flex justify-center items-center gap-x-1 text-[#00CBC0]'>
                                        <i className="fa-solid fa-circle-arrow-up text-sm"></i>
                                        <p className=''>50m<sup>3</sup></p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-start flex-col bg-[#FFFFFF] py-3 px-10 rounded-xl'>
                                    <div className='flex justify-center items-center gap-2 text-[#3D5161]'>
                                        <p className='font-medium text-xl'>{avgSales}</p>
                                        <p className='text-sm'>m<sup>3</sup></p>
                                    </div>
                                    <p className='text-sm font-medium text-[#3D5161]'>Avg Sales</p>
                                    <div className='flex justify-center items-center gap-x-1 text-[#FF7F5C]'>
                                        <i className="fa-solid fa-circle-arrow-down text-sm"></i>
                                        <p className=''>2%</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-start flex-col bg-[#FFFFFF] py-3 px-10 rounded-xl'>
                                    <p className='font-medium text-xl text-[#3D5161]'>{transactionCount}</p>
                                    <p className='text-sm font-medium text-[#3D5161]'>Total Transaction Count</p>
                                    <div className='flex justify-center items-center gap-x-1 text-[#00CBC0]'>
                                        <i className="fa-solid fa-circle-arrow-up text-sm"></i>
                                        <p className=''>50m<sup>3</sup></p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#FFFFFF] flex justify-center items-center gap-2 rounded-2xl mb-4'>
                                <button
                                    className={`px-5 py-1 rounded-2xl font-medium text-sm uppercase ${
                                        activeSection === 'graph' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'bg-transparent text-[#3D5161]'
                                    }`}
                                    onClick={() => handleButtonClick('graph')}
                                >
                                    <i className="fa-solid fa-chart-simple mr-1"></i> Graph
                                </button>
                                <button
                                    className={`px-5 py-1 rounded-2xl font-medium text-sm uppercase ${
                                        activeSection === 'list' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'bg-transparent text-[#3D5161]'
                                    }`}
                                    onClick={() => handleButtonClick('list')}
                                >
                                    <i className="fa-solid fa-bars mr-1"></i> List
                                </button>
                            </div>
                            {activeSection === 'graph' && <DashBoardGraphSectionGraph data={graphData} />}
                            {activeSection === 'list' && <DashBoardGraphSectionList />}
                        </div>
                        <div className='flex flex-col justify-start h-full items-center gap-y-5 text-[#3D5161] w-[30%]'>
                            <p className='text-2xl font-medium'>Hourly Sales</p>
                            <RadarChart selectedPeriod={selectedPeriod} />
                            <p className='text-xl font-medium'>Sales by Station</p>
                            <div className='flex flex-col items-center p-5 gap-y-4 overflow-auto max-h-52 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
                                {stations.map((station, index) => (
                                    <div key={index} className='flex flex-col items-center gap-y-1' onClick={() => handleStationClick(station)}>
                                        <div className='flex justify-center items-center gap-3 cursor-pointer'>
                                            <i className="fa-solid fa-car-tunnel text-2xl"></i>
                                            <p className='text-sm font-medium'>{station.name}</p>
                                            <p className='text-base font-medium'>{station.volume}m<sup>3</sup></p>
                                        </div>
                                        <div className="w-full bg-[#F4DBD4] rounded-full h-1.5">
                                            <div className="bg-[#FF7F5C] h-1.5 rounded-full" style={{ width: `${station.progress}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

