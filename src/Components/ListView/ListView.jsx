import React, { useState } from 'react';
import ViewListBar from '../ViewListBar/ViewListBar'
import SideBar from '../SideBar/SideBar'

export default function ListView() {

    const stationsData = [
        { name: "Station 1", compression: "Active", compressionState: "Normal", alarmCount: 120, warningCount: 1926, activeDispenser: "2/3" },
        { name: "Station 2", compression: "Inactive", compressionState: "Warning", alarmCount: 85, warningCount: 1500, activeDispenser: "1/3" },
        { name: "Station 3", compression: "Inactive", compressionState: "Warning", alarmCount: 13, warningCount: 1900, activeDispenser: "3/3" },
    ];

    const [selectedClass, setSelectedClass] = useState('Classes');
    const [selectedLocation, setSelectedLocation] = useState('Location');
    const [sortBy, setSortBy] = useState(null);

    const filteredStations = stationsData
        .filter(station => (selectedClass === 'Classes' || station.compression === selectedClass))
        .filter(station => (selectedLocation === 'Location' || station.compressionState === selectedLocation))
        .sort((a, b) => {
            if (sortBy === 'alarm') return b.alarmCount - a.alarmCount;
            if (sortBy === 'warning') return b.warningCount - a.warningCount;
            if (sortBy === 'dispenser') return b.activeDispenser.split('/')[0] - a.activeDispenser.split('/')[0]; // Assuming the first number is the one to sort by
                return 0;
    });

  return (
    <>
    <SideBar/>
    <div className='absolute top-0 right-0 h-full w-[95%] bg-[#F9F5F3]'>
      <ViewListBar/>
      <div className='p-4 w-full h-[90%] flex items-start justify-center absolute right-0 bottom-0'>
      <div className='flex items-center w-[80%] justify-center p-5 mb-5 flex-col gap-y-7'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-x-4'>
          <div className='flex items-center gap-x-2 text-[#3D5161]'>
            <i className="fa-solid fa-arrow-down-wide-short"></i>
            <p className='text-base'>Filter:</p>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="cursor-pointer drop-shadow-sm bg-[#FFFFFF] border border-[#00000029] text-[#3D5161] text-sm rounded-lg focus:ring-[#00000029] focus:border-[#00000029] font-medium w-full py-2 px-7"
          >
            <option>Classes</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="cursor-pointer drop-shadow-sm bg-[#FFFFFF] border border-[#00000029] text-[#3D5161] text-sm rounded-lg focus:ring-[#00000029] focus:border-[#00000029] font-medium w-full py-2 px-7"
          >
            <option>Location</option>
            <option value="Normal">Normal</option>
            <option value="Warning">Warning</option>
          </select>
        </div>
        <div className='flex gap-x-4'>
          <div className='flex items-center gap-x-2 text-[#3D5161]'>
            <i className="fa-solid fa-arrow-down-wide-short"></i>
            <p className='text-base'>Sort by:</p>
          </div>
          <button onClick={() => setSortBy('alarm')} className='font-medium text-lg capitalize text-[#3D5161]'>Alarm</button>
          <button onClick={() => setSortBy('warning')} className='font-medium text-lg capitalize text-[#3D5161]'>Warning</button>
          <button onClick={() => setSortBy('dispenser')} className='font-medium text-lg capitalize text-[#3D5161]'>Dispenser</button>
        </div>
      </div>
      {filteredStations.map((station, index) => (
        <div key={index} className='flex justify-between items-center w-full bg-[#FFFFFF] p-4 rounded-md'>
          <div className='flex justify-center items-center gap-2'>
            <div className='flex justify-center items-end gap-1'>
              <span className='p-1.5 mr-1 rounded-full bg-[#FF7F5C]'></span>
              <i className="fa-solid fa-car-tunnel text-6xl text-[#FF7F5C]"></i>   
            </div>
            <p className='w-[60%] font-medium text-base text-[#3D5161]'>{station.name}</p>
          </div>
          <div className='flex flex-col items-center text-[#3D5161]'>
            <p className='font-medium text-lg'>{station.compression}</p>
            <p className='font-medium text-sm'>{station.compressionState}</p>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <div className='flex items-center justify-center p-2 bg-[#f4988d] rounded-full'>
              <span className='p-1.5 rounded-full bg-[#C44536]'></span>
            </div>
            <div className='flex flex-col items-start text-[#3D5161]'>
              <p className='font-medium text-lg'>{station.alarmCount}</p>
              <p className='font-medium text-sm'>Alarm Count</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <div className='flex items-center justify-center p-2 bg-[#f7df99] rounded-full'>
              <span className='p-1.5 rounded-full bg-[#F7B801]'></span>
            </div>
            <div className='flex flex-col items-start text-[#3D5161]'>
              <p className='font-medium text-lg'>{station.warningCount}</p>
              <p className='font-medium text-sm'>Warning Count</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <i className="fa-solid fa-gas-pump text-4xl text-[#3D5161]"></i>
            <div className='flex flex-col items-start text-[#3D5161]'>
              <p className='font-medium text-lg'>{station.activeDispenser}</p>
              <p className='font-medium text-sm'>Active Dispenser</p>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
    </>
  )
}
