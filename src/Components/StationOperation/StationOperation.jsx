import DashboardGraphBar from '../DashboardGraphBar/DashboardGraphBar'
import '../StationFinance/ToggleComponent.css'
import React, { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';


const SemiCircleGauge = ({ value }) => {
    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: { enabled: true },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: { background: "#e7e7e7", margin: 15 },
                dataLabels: {
                    name: { show: false },
                    value: { offsetY: -2, fontSize: '22px' },
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91],
            },
        },
    };

    return <ReactApexChart options={options} series={[value]} type="radialBar" />;
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


export default function StationOperation() {





    const [selectedData, setSelectedData] = useState('pressure');
    const [statusData, setStatusData] = useState('compressorStatus');
    const [isOpenOne, setIsOpenOne] = useState(false);
    const [isOpenTwo, setIsOpenTwo] = useState(false);
    const toggleDivOne = () => {
        setIsOpenOne(prevState => !prevState);
    };
    const toggleDivTwo = () => {
        setIsOpenTwo(prevState => !prevState);
    };
    const dataValues = {
        pressure: 76,
        kpi: 50,
        temperature: 90,
    };

    const radarData = {
        compressorStatus: [
            { name: 'Series 1', data: [80, 60, 70, 90, 80, 85],},
            { name: 'Series 2', data: [70, 50, 60, 80, 70, 60],},
            { name: 'Series 3', data: [60, 70, 80, 50, 40, 30],},
            { name: 'Series 4', data: [10, 70, 20, 50, 100, 30], },
        ],
        dispenserDetails: [
            { name: 'Series 1', data: [50, 40, 30, 20, 10, 5], },
            { name: 'Series 2', data: [30, 20, 10, 5, 0, 0],},
            { name: 'Series 3', data: [20, 10, 5, 0, 0, 0]},
            { name: 'Series 4', data: [100, 20, 5, 0, 100, 0], },
        ],
    };
    const alerts = [
        {
            name: "Alert Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "Alert Intensity"
        },
        {
            name: "Alert Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "Alert Intensity"
        },
        {
            name: "Alert Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "Alert Intensity"
        },{
            name: "Alert Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "Alert Intensity"
        },{
            name: "Alert Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "Alert Intensity"
        },
    ];
    const warnings = [
        {
            name: "warnings Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "warnings Intensity"
        },
        {
            name: "warnings Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "warnings Intensity"
        },
        {
            name: "warnings Dummy Name",
            code: "code",
            date: "8/8/2024, 5:12:21 AM",
            type: "Pressure Alarm",
            intensity: "warnings Intensity"
        },
    ];


    const compressorStatusData = [
        {
            label: 'Idle',
            color: '#F7B801',
            height: '60%',
        },
        {
            label: 'Compression',
            color: '#00CBC0',
            height: '50%',
        },
        {
            label: 'Recirculating',
            color: '#009ACF',
            height: '50%',
        },
        {
            label: 'Others',
            color: '#1F78B4',
            height: '50%',
        },
    ];
    
    const dispenserStatusData = [
        {
            label: 'Idle',
            color: '#F7B801',
            height: '10%',
        },
        {
            label: 'Dispensing',
            color: '#00CBC0',
            height: '50%',
        },
        {
            label: 'Standby',
            color: '#009ACF',
            height: '50%',
        },
        {
            label: 'Others',
            color: '#1F78B4',
            height: '100%', 
        },
    ];
    
    const StatusDisplay = ({ statusData }) => (
        <div className='flex gap-8'>
            {statusData.map(({ label, color, height }) => (
                <div key={label} className='flex flex-col items-center gap-y-2'>
                    <div className="w-5 bg-[#E0E7E1] h-[15vh] -rotate-180">
                        <div className="bg" style={{ backgroundColor: color, height: height }} />
                    </div>
                    <p className='text-xs'>{label}</p>
                </div>
            ))}
        </div>
    );   

    return (
        <div className='p-4 mx-auto w-[100%] h-full flex justify-center items-center flex-nowrap  rounded-md'>
            <div className='flex items-start justify-between w-full gap-5'>  
                <div className='flex flex-col justify-center items-end gap-y-10 w-[70%]'>
                    <div className='flex flex-col p-5 w-full bg-[#FFFFFF] rounded-md gap-x-10'>
                        <div className='flex items-center justify-between w-full border-b-2 border-[#E0E7F1] pb-2'>
                            <p className='text-[#3D5161] font-medium text-sm uppercase'>stations details</p>
                            <div className='flex gap-5'>
                                <button onClick={() => setSelectedData('pressure')} className={`font-medium text-sm uppercase ${selectedData === 'pressure' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}>Pressure</button>
                                <button onClick={() => setSelectedData('kpi')} className={`font-medium text-sm uppercase ${selectedData === 'kpi' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}>KPI</button>
                                <button onClick={() => setSelectedData('temperature')} className={`font-medium text-sm uppercase ${selectedData === 'temperature' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}>Temperature</button>
                            </div>
                            <div className='flex gap-5 justify-center items-center'>
                                <div className={`toggle-buttons ${isOpenOne ? 'open' : 'closed'}`}>
                                    <div className='flex justify-center items-center gap-2 rounded-lg bg-[#F9F5F3] text-[#B2BEC3]' >
                                        <button className='bg-[#FF7F5C] text-[#FFFFFF] px-2 py-1 rounded-lg'>
                                            <i class="fa-solid fa-gauge-simple-high"></i>
                                        </button>
                                        <button className='rounded-lg px-2 py-1'>
                                            <i class="fa-solid fa-bars-progress"></i>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={toggleDivOne} className="text-[#B2BEC3]">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-between items-center p-5'>        
                            <SemiCircleGauge value={dataValues[selectedData]} />
                            <p className='text-xs uppercase'>{selectedData} value</p>
                            <p className='text-ms'>{dataValues[selectedData]} units</p>
                        </div>
                    </div>
                    <div className='flex flex-col p-5 w-full bg-[#FFFFFF] rounded-md gap-x-10'>
                        <div className='flex items-center justify-between w-full border-b-2 border-[#E0E7F1] pb-2'>
                            <p className='text-[#3D5161] font-medium text-sm uppercase'>stations details</p>
                            <div className='flex gap-5'>
                                <button onClick={() => setStatusData('compressorStatus')} className={`font-medium text-sm uppercase ${statusData === 'compressorStatus' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}>Compressor Status</button>
                                <button onClick={() => setStatusData('dispenserDetails')} className={`font-medium text-sm uppercase ${statusData === 'dispenserDetails' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}>Dispenser Details</button>
                            </div>
                            <div className='flex gap-5 justify-center items-center'>
                                <div className={`toggle-buttons ${isOpenTwo ? 'open' : 'closed'}`}>
                                    <div className='flex justify-center items-center gap-2 rounded-lg bg-[#F9F5F3] text-[#B2BEC3]' >
                                        <button className='bg-[#FF7F5C] text-[#FFFFFF] px-2 py-1 rounded-lg'>
                                            <i class="fa-solid fa-chart-column"></i>
                                        </button>
                                        <button className='rounded-lg px-2 py-1'>
                                            <i class="fa-solid fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={toggleDivTwo} className="text-[#B2BEC3]">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>                              
                            </div>
                        </div>
                        <div className='flex justify-between items-center p-5'>        
                            <div className='flex justify-between items-center p-5'>        
                                <RadarChart data={radarData[statusData]} />
                            </div>
                            <div className='flex items-center justify-center flex-col gap-y-10'>
                                {statusData === 'compressorStatus' && <StatusDisplay statusData={compressorStatusData} />}
                                {statusData === 'dispenserDetails' && <StatusDisplay statusData={dispenserStatusData} />}
                                <p className='text-ms uppercase font-bold'>overall</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-y-5 text-[#3D5161] w-[30%]'>
                    <div className='flex justify-between items-center gap-10 h-auto bg-[#F4DBD4] w-full rounded-xl'>
                        <div className='flex gap-2 w-[40%] justify-center items-center bg-[#FF7F5C] text-[#FFFFFF] px-5 py-2 rounded-xl font-medium'>
                            <i class="fa-solid fa-compress text-3xl"></i>
                            <p className='capitalize text-xs'>compressor status</p>
                        </div>
                        <p className='capitalize flex justify-center items-center w-[60%] font-medium'>compression</p>
                    </div>
                    <div className='flex flex-col justify-center items-center text-[#3D5161] w-full bg-[#FFFFFF] rounded-lg  '>
                       <div className='w-full mb-5'>
                            <div className='flex  justify-between items-center gap-x-2 px-6 py-4 border-[#E0E7F1] border-b-2 w-[100%]'>
                                <div className='flex justify-center items-center gap-3'>
                                    <div className='flex justify-start items-center '>
                                        <span className='p-1 mr-2 rounded-full bg-[#C44536]'></span>
                                        <td scope="row" class=" font-medium ">
                                            Alerts
                                        </td>
                                    </div>
                                    <p className='text-xs text-[#3D516199]'>Total 100</p>
                                </div>
                                <button className='text-[#FF7F5C] font-medium '>
                                    View all
                                    <i class="fa-solid fa-chevron-right ml-4"></i>
                                </button>
                            </div> 
                            <div className='flex flex-col justify-start items-center gap-3 w-[100%] px-1.5 text-[#3D5161] overflow-auto max-h-56 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
                                {alerts.map((alert, index) => (
                                    <div key={index} className='flex justify-between items-center w-[100%] border-[#E0E7F1] border-b-2 px-5'>
                                        <div className='flex flex-col items-start'>
                                            <p className='text-sm font-medium'>{alert.name} - <span className='text-xs'>{alert.code}</span></p>
                                            <p className='text-xs'>{alert.date}</p>
                                        </div>
                                        <div className='flex flex-col items-end'>
                                            <p className='text-sm'>{alert.type}</p>
                                            <p className='text-xs'>{alert.intensity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                       </div>
                       <div className='w-full  mb-5'>
                            <div className='flex  justify-between items-center gap-x-2 px-6 py-4 border-[#E0E7F1] border-b-2 w-[100%]'>
                                <div className='flex justify-center items-center gap-3'>
                                    <div className='flex justify-start items-center '>
                                        <span className='p-1 mr-2 rounded-full bg-[#F7B801]'></span>
                                        <td scope="row" class=" font-medium ">
                                            Warnings
                                        </td>
                                    </div>
                                    <p className='text-xs text-[#3D516199]'>Total 100</p>
                                </div>
                                <button className='text-[#FF7F5C] font-medium '>
                                    View all
                                    <i class="fa-solid fa-chevron-right ml-4"></i>
                                </button>
                            </div> 
                            <div className='flex flex-col justify-start items-center gap-3 w-[100%] px-1.5 text-[#3D5161] overflow-auto max-h-56 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
                                {warnings.map((warnings, index) => (
                                    <div key={index} className='flex justify-between items-center w-[100%] border-[#E0E7F1] border-b-2 px-5'>
                                        <div className='flex flex-col items-start'>
                                            <p className='text-sm font-medium'>{warnings.name} - <span className='text-xs'>{warnings.code}</span></p>
                                            <p className='text-xs'>{warnings.date}</p>
                                        </div>
                                        <div className='flex flex-col items-end'>
                                            <p className='text-sm'>{warnings.type}</p>
                                            <p className='text-xs'>{warnings.intensity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
