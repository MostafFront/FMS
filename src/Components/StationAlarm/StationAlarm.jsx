import DashboardGraphBar from '../DashboardGraphBar/DashboardGraphBar';
import SideBar from '../SideBar/SideBar';
import ReactApexChart from 'react-apexcharts';
import React, { useState } from 'react';

const ApexChartBar = ({ chartData }) => {
  const colors = ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019'];
  
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false, // Disable the toolbar
      },
    },
    
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px'
        }
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={[{ data: chartData.values }]} type="bar" height={350} />
    </div>
  );
};


const ApexChartRadialBar = ({ value }) => {

    const getColor = (value) => {
        if (value < 40) {
          return '#FF4560'; // Red
        } else if (value < 55) {
          return '#FEB019'; // Orange
        } else {
          return '#00E396'; // Green
        }
      };

    const options = {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          track: {
            background: '#e7e7e7', // Optional: background for the radial bar
          },
          dataLabels: {
            show: false, // Disable data labels
          },
        },
      },
      colors: [getColor(value)],
      labels: [], // No labels in the center
    };
  
    return (
      <div className="flex relative justify-center items-center">
        <div className=' absolute font-medium text-lg'>{value}%</div>
        <ReactApexChart options={options} series={[value]} type="radialBar" height={350} />
      </div>
    );
  };

export default function StationAlarm() {
  const [currentData, setCurrentData] = useState('pressure');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);

  };
  const dataMap = {
    pressure: {
      bar: {
        categories: ['Station 1', 'Station 2', 'Station 3' , 'Station 4' , 'Station 5' , 'Station 6' , 'Station 7' ],
        values: [21, 22, 10 ,15 ,33 ,9 ,26]
      },
      radial: 52
    },
    kpi: {
      bar: {
        categories: ['Station 1', 'Station 2', 'Station 3', 'Station 4' , 'Station 5'],
        values: [30, 40, 20 ,36 , 9]
      },
      radial: 85
    },
    temperature: {
      bar: {
        categories: ['Station 1', 'Station 2', 'Station 3', 'Station 4' , 'Station 5' , 'Station 6' , 'Station 7' ,'Station 8' , 'Station 9' , 'Station 10'],
        values: [15, 25, 35,10,5,27,18,30,21,13]
      },
      radial: 20
    }
  };

  const handleButtonClick = (type) => {
    setCurrentData(type);
  };

  const alertsData = [
    {
      id: 1,
      name: "Pressure Alert - code",
      timestamp: "8/8/2024, 5:12:21 AM",
      intensity: "Pressure Alarm",
      alertLevel: "High"
    },
    {
      id: 2,
      name: "Temperature Alert - code",
      timestamp: "8/8/2024, 6:12:21 AM",
      intensity: "Temperature Alarm",
      alertLevel: "Medium"
    },
    {
      id: 3,
      name: "Humidity Alert - code",
      timestamp: "8/8/2024, 7:12:21 AM",
      intensity: "Humidity Alarm",
      alertLevel: "Low"
    },
  ];

  return (
    <>
      <SideBar />
      <div className='absolute top-0 right-0 h-auto w-[95%] bg-[#F9F5F3] flex flex-col'>
        <DashboardGraphBar selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange}  />
        <div className='flex justify-around items-center bg-[#FFFFFF] my-1 ap-1 w-full'>
          <button className='text-2xl text-[#3D5161] flex items-center justify-center pl-10 border-r-2 border-[#3D51614C] p-1 capitalize font-medium'>
            <i className="fa-solid fa-location-dot pr-4"></i>
            All Cities
            <i className="fa-solid fa-angle-down pl-28 pr-16"></i>
          </button>
          <button className='text-2xl text-[#3D5161] flex items-center justify-center pl-10 border-r-2 border-[#3D51614C] p-1 capitalize font-medium'>
            <i className="fa-solid fa-gas-pump pr-4"></i>
            All Stations
            <i className="fa-solid fa-angle-down pl-28 pr-16"></i>
          </button>
          <button className='text-2xl text-[#3D5161] flex items-center justify-center pl-10 p-1 capitalize font-medium'>
            <i className="fa-brands fa-atlassian pr-4"></i>
            All Classes
            <i className="fa-solid fa-angle-down pl-28"></i>
          </button>
        </div>
        <div className='flex justify-between items-center bg-[#FFFFFF] my-1'>
          <button className='text-2xl text-[#3D5161] font-medium flex items-center justify-center pl-10 w-[45%] border-b-4 border-[#FF7F5C] p-2 uppercase'>
            Alarms
          </button>
          <button className='text-2xl text-[#3D5161] font-medium flex items-center justify-center w-[45%] p-2 uppercase'>
            Warnings
          </button>
        </div>
        <div className='p-4 mx-auto w-full flex justify-center items-center flex-nowrap rounded-md'>
          <div className='flex items-start justify-between w-full gap-7'>
            <div className='flex flex-col justify-center items-end gap-y-10 w-[70%]'>
              <div className='flex flex-col p-5 w-full bg-[#FFFFFF] rounded-md gap-x-10'>
                <div className='flex items-center justify-between w-full border-b-2 border-[#E0E7F1]'>
                  <p className='text-[#3D5161] font-medium text-sm uppercase'>Station Details</p>
                  <div className='flex gap-5'>
                    <button 
                      className={`text-[#3D5161] font-medium text-sm uppercase ${currentData === 'pressure' ? 'font-bold border-b-2 border-[#FF7F5C] text-[#FF7F5C]' : ''}`}
                      onClick={() => handleButtonClick('pressure')}
                    >
                      Pressure
                    </button>
                    <button 
                      className={`text-[#3D5161] font-medium text-sm uppercase ${currentData === 'kpi' ? 'font-bold border-b-2 border-[#FF7F5C] text-[#FF7F5C]' : ''}`}
                      onClick={() => handleButtonClick('kpi')}
                    >
                      KPI
                    </button>
                    <button 
                      className={`text-[#3D5161] font-medium text-sm uppercase ${currentData === 'temperature' ? 'font-bold border-b-2 border-[#FF7F5C] ' : ''}`}
                      onClick={() => handleButtonClick('temperature')}
                    >
                      Temperature
                    </button>
                  </div>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
                <div className='flex justify-around items-center bg-[#FFFFFF] my-1 h-auto p-1 w-full'>
                  <div className='flex flex-col justify-center items-center text-[#3D5161] font-bold w-[15%] text-center'>
                    <ApexChartRadialBar value={dataMap[currentData].radial} />
                    <p className='font-medium text-lg'>CT / RT</p>
                  </div>
                  <div className='flex flex-col justify-center items-center text-[#3D5161] font-bold gap-y-1 w-[15%] text-center'>
                    <p>4322</p>
                    <p>Total Working Time</p>
                  </div>
                  <div className='flex flex-col justify-center items-center text-[#3D5161] font-bold gap-y-2 w-[15%] text-center'>
                    <p>4322</p>
                    <p>Total Working Time</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col p-5 w-full bg-[#FFFFFF] rounded-md gap-x-10'>
                <div className='flex items-center justify-between w-full border-b-2 border-[#E0E7F1] pb-2'>
                  <p className='text-[#3D5161] font-bold text-xs uppercase'>Alarm Classification</p>
                </div>
                <ApexChartBar chartData={dataMap[currentData].bar} />
              </div>
            </div>
            <div className='flex flex-col justify-start items-center text-[#3D5161] w-[30%] bg-[#FFFFFF] rounded-lg p-4'>
              <div className='flex justify-start items-center gap-x-2 border-[#E0E7F1] border-b-2 w-full '>
                <div className='flex justify-start items-center px-2 py-4'>
                  <span className='p-1 mr-2 rounded-full bg-[#C44536]'></span>
                  <td scope="row" className="font-medium">
                    Alerts
                  </td>
                </div>
                <p className='text-xs text-[#3D516199]'>Total {alertsData.length}</p>
              </div>
              <div className='flex flex-col justify-start items-center gap-1.5 w-full text-[#3D5161] overflow-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
                {alertsData.map(alert => (
                  <div key={alert.id} className='flex justify-between items-center w-full border-[#E0E7F1] border-b-2 p-1'>
                    <div className='flex flex-col items-start'>
                      <p className='text-sm font-medium'>{alert.name}</p>
                      <p className='text-xs'>{alert.timestamp}</p>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-sm'>{alert.intensity}</p>
                      <p className='text-xs'>Alert Intensity</p>
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
