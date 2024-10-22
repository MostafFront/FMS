import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import './ToggleComponent.css';

const ApexChartDumbbell = ({ data }) => {
    const options = {
        chart: {
            height: 390,
            type: 'rangeBar',
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        colors: ['#EC7D31', '#36BDCB'],
        plotOptions: {
            bar: {
                horizontal: true,
                isDumbbell: true,
                dumbbellColors: [['#EC7D31', '#36BDCB']],
            },
        },
        legend: {
            show: false,
        },
        fill: {
            type: 'gradient',
            gradient: {
                gradientToColors: ['#36BDCB'],
                inverseColors: false,
                stops: [0, 100],
            },
        },
        grid: {
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } },
        },
    };

    const series = [{ data }];

    return <ReactApexChart options={options} series={series} type="rangeBar" height={390} />;
};

const ApexChartBar = ({ data }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
        fill: { opacity: 1 },
        legend: { show: false },
        tooltip: {
            y: { formatter: (val) => "$ " + val + " thousands" },
        },
    };

    return <ReactApexChart options={options} series={data} type="bar" height={350} />;
};

const ApexChartLine = ({ data }) => {
    const options = {
        chart: {
            height: 600,
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
        legend: { show: false },
    };

    return <ReactApexChart options={options} series={data} type="line" height={350} />;
};

const RadarChart = ({ data }) => {
    useEffect(() => {
        const options = {
            series: data,
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
            xaxis: { categories: ['2011', '2012', '2013', '2014', '2015', '2016'] },
            legend: { show: false },
            tooltip: { enabled: false },
        };

        const chart = new ApexCharts(document.querySelector("#radar-chart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <div id="radar-chart"></div>;
};

export default function StationFinance({ selectedPeriod }) {
    const location = useLocation();
    const { station } = location.state || {};
    const [isOpen, setIsOpen] = useState(false);
    const [currentChart, setCurrentChart] = useState('bar'); // Default chart type
    const [currentDataType, setCurrentDataType] = useState('sales'); // Default data type

    const getRandomData = (length, min, max) => {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
      };
    const data = {
        sales: [
            { name: 'Sales A', data: getRandomData(9, 10, 100) },
            { name: 'Sales B', data: getRandomData(9, 10, 100) },
            { name: 'Sales C', data: getRandomData(9, 10, 100) },
        ],
        transaction: [
            { name: 'Sales A', data: getRandomData(9, 10, 100) },
            { name: 'Sales B', data: getRandomData(9, 10, 100) },
            { name: 'Sales C', data: getRandomData(9, 10, 100) },
        ],
        value: [
            { name: 'Sales A', data: getRandomData(9, 10, 100) },
            { name: 'Sales B', data: getRandomData(9, 10, 100) },
        ],
    };

    const toggleDiv = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleChartToggle = (chartType) => {
        setCurrentChart(chartType);
    };

    const handleDataTypeChange = (dataType) => {
        setCurrentDataType(dataType);
    };

    const renderChart = () => {
        const chartData = data[currentDataType];
        switch (currentChart) {
            case 'line':
                return <ApexChartLine data={chartData} />;
            case 'bar':
                return <ApexChartBar data={chartData} />;
            case 'range':
                return <ApexChartDumbbell data={chartData.map(d => ({ x: d.name, y: d.data }))} />;
            default:
                return null;
        }
    };

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
            <div className='p-4 mx-auto w-full h-full flex justify-start items-center flex-nowrap rounded-md'>
                <div className='flex items-start h-full justify-between px-10 w-full'>
                    <div className='flex flex-col justify-start items-end gap-y-10 w-[70%]'>
                        <div className='flex justify-center items-center gap-x-7 text-[#3D5161]'>
                            <div className='flex justify-center items-start flex-col bg-[#F4DBD4] py-5 px-10 gap-y-5 rounded-xl'>
                                <div className='flex justify-center items-center gap-2'>
                                    <p className='font-medium text-xl'>{totalValue}</p>
                                    <p className='text-sm'>EGP</p>
                                </div>
                                <div className='flex justify-center items-center gap-x-1'>
                                    <i className="fa-solid fa-money-bill text-xl"></i>
                                    <p className='font-medium text-sm'>Total Value</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-start flex-col bg-[#FFFFFF] py-3 px-10 gap-y-5 rounded-xl'>
                                <div className='flex justify-center items-center gap-2'>
                                    <p className='font-medium text-xl'>{totalSales}</p>
                                    <p className='text-sm'>m<sup>3</sup></p>
                                </div>
                                <div className='flex justify-center items-center gap-x-1 '>
                                    <i className="fa-solid fa-wallet text-xl"></i>
                                    <p className='font-medium text-sm'>Total Sales</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-start flex-col bg-[#FFFFFF] py-3 px-10 gap-y-5 rounded-xl'>
                                <div className='flex justify-center items-center gap-2 '>
                                    <p className='font-medium text-xl'>{avgSales}</p>
                                    <p className='text-sm'>50m<sup>3</sup></p>
                                </div>
                                <div className='flex justify-center items-center gap-x-1 '>
                                    <i className="fa-solid fa-wallet text-xl"></i>
                                    <p className='font-medium text-sm'>Avg Sales</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-start flex-col bg-[#FFFFFF] py-3 px-10 gap-y-5 rounded-xl'>
                                <p className='font-medium text-xl'>{transactionCount}</p>
                                <div className='flex justify-center items-center gap-x-1 '>
                                    <i className="fa-solid fa-circle-arrow-up text-sm"></i>
                                    <p className='font-medium text-sm'>Transaction Count</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col p-5 w-full h-full bg-[#FFFFFF] rounded-md gap-x-10'>
                            <div className='flex items-center justify-between w-full border-b-2 border-[#E0E7F1] pb-2'>
                                <p className='text-[#3D5161] font-medium text-sm uppercase'>Stations Activities Overview</p>
                                <div className='flex gap-5'>
                                    <button onClick={() => handleDataTypeChange('sales')} className={`text-${currentDataType === 'sales' ? '[#FF7F5C]' : '[#3D5161]'} font-medium text-sm uppercase`}>
                                        Sales
                                    </button>
                                    <button onClick={() => handleDataTypeChange('transaction')} className={`text-${currentDataType === 'transaction' ? '[#FF7F5C]' : '[#3D5161]'} font-medium text-sm uppercase`}>
                                        Transaction
                                    </button>
                                    <button onClick={() => handleDataTypeChange('value')} className={`text-${currentDataType === 'value' ? '[#FF7F5C]' : '[#3D5161]'} font-medium text-sm uppercase`}>
                                        Value
                                    </button>
                                </div>
                                <div className='flex gap-5 justify-center items-center'>
                                    <div className={`toggle-buttons ${isOpen ? 'open' : 'closed'}`}>
                                        <div className='flex justify-center items-center gap-2 rounded-lg bg-[#F9F5F3] text-[#B2BEC3]'>
                                            <button onClick={() => handleChartToggle('line')} className={`rounded-lg px-2 py-1 ${currentChart === 'line' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : ''}`}>
                                                <i className="fa-solid fa-chart-line"></i>
                                            </button>
                                            <button onClick={() => handleChartToggle('bar')} className={`rounded-lg px-2 py-1 ${currentChart === 'bar' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : ''}`}>
                                                <i className="fa-solid fa-chart-column"></i>
                                            </button>
                                            <button onClick={() => handleChartToggle('range')} className={`rounded-lg px-2 py-1 ${currentChart === 'range' ? 'bg-[#FF7F5C] text-[#FFFFFF]' : ''}`}>
                                                <i className="fa-solid fa-list-ul"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={toggleDiv} className="text-[#B2BEC3]">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>
                                </div>
                            </div>
                            {renderChart()}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-y-10 text-[#3D5161] w-[30]'>
                        <div className='flex flex-col justify-center items-center gap-y-10 h-auto'>
                            <p className='font-bold text-sm'>Dispenser Sales</p>
                            <div className='flex gap-3 justify-center items-center'>
                                {['D1', 'D2', 'D3', 'D4', 'D5'].map((dispenser, index) => (
                                    <div key={index} className='flex flex-col gap-y-2 items-center'>
                                        <div className="w-3 bg-[#E0E7F1] rounded-full h-[15vh] -rotate-180">
                                            <div className="bg-[#FF7F5C] w-3 rounded-full" style={{ height: '45%' }} />
                                        </div>
                                        <p className='text-lg font-medium'>{dispenser}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-y-5'>
                            <p className='font-bold text-sm'>Hourly Sales</p>
                            <div>
                                <RadarChart data={[
                                    { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                    { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                    { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                                ]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
