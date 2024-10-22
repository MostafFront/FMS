import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { Link, useNavigate } from 'react-router-dom';

export default function Nozzle({ data, setData }) {
    const navigate = useNavigate();

    const handleDelete = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData); 
    };

    const handleEdit = (index) => {
        const stationToEdit = data[index];
        navigate('/NewNozzle', { state: { station: stationToEdit, index } });
    };

    const [stationFilter, setStationFilter] = useState("Station Filter");
    const [dispenserFilter, setDispenserFilter] = useState("Dispenser Filter");

    const handleStationChange = (event) => {
        setStationFilter(event.target.value);
    };

    const handleDispenserChange = (event) => {
        setDispenserFilter(event.target.value);
    };

    // Filter data based on selected filters
    const filteredData = data.filter(item => {
        const stationMatch = stationFilter === "Station Filter" || item.station === stationFilter;
        const dispenserMatch = dispenserFilter === "Dispenser Filter" || item.dispenser === dispenserFilter;
        return stationMatch && dispenserMatch;
    });

    return (
        <>
            <NavBar />
            <SideBar />
            <div className='h-full pt-[10%] w-[95%] absolute right-0 bottom-0 justify-center items-start flex bg-[#F9F5F3]'>
                <div className='flex flex-col w-[80%] min-h-full justify-start items-end'>
                    <div className='flex justify-end items-center mb-6 gap-10'>
                        <select 
                            id="station-filter" 
                            className="cursor-pointer drop-shadow-xl bg-[#FFFFFF] border border-[#00000029] text-[#3D5161] text-sm rounded-lg focus:ring-[#00000029] focus:border-[#00000029] font-medium w-full py-2 px-7"
                            value={stationFilter}
                            onChange={handleStationChange}
                        >
                            <option value="Station Filter" disabled>Station Filter</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                        <select 
                            id="dispenser-filter" 
                            className="cursor-pointer drop-shadow-xl bg-[#FFFFFF] border border-[#00000029] text-[#3D5161] text-sm rounded-lg focus:ring-[#00000029] focus:border-[#00000029] font-medium w-full py-2 px-7"
                            value={dispenserFilter}
                            onChange={handleDispenserChange}
                        >
                            <option value="Dispenser Filter" disabled>Dispenser Filter</option>
                            <option value="D1">Dispenser 1</option>
                            <option value="D2">Dispenser 2</option>
                            <option value="D3">Dispenser 3</option>
                            {/* Add more dispenser options as needed */}
                        </select>
                    </div>
                    <div className="relative shadow-md sm:rounded-lg w-full overflow-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                        <table className="w-full text-sm text-left rtl:text-right bg-[#FFFFFF]">
                            <thead className="text-xs text-[#707070] border-b border-[#B2BEC3]">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nozzle Name</th>
                                    <th scope="col" className="px-6 py-3">Channel ID</th>
                                    <th scope="col" className="px-6 py-3">Station</th>
                                    <th scope="col" className="px-6 py-3">Dispenser</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">There is no info</td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="border-b text-[#707070]">
                                            <td className="px-6 py-4 font-medium">{item.name}</td>
                                            <td className="px-6 py-4">{item.id}</td>
                                            <td className="px-6 py-4">{item.station}</td>
                                            <td className="px-6 py-4">{item.dispenser}</td>
                                            <td className='flex justify-end items-center px-6 py-4'>
                                                <button onClick={() => handleEdit(index)}>
                                                    <i className="fa-regular fa-pen-to-square text-sm p-2 mr-6 text-[#2C3E50] bg-[#3D516133] rounded-md"></i>
                                                </button>
                                                <button onClick={() => handleDelete(index)}>
                                                    <i className="fa-regular fa-trash-can text-sm p-2 text-[#FF7F5C] bg-[#FF7F5C33] rounded-md"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex-col-reverse flex mt-6'>
                        <Link to={'/NewNozzle'} className="text-white bg-[#FF7F5C] hover:bg-[#f56b44] focus:ring-4 focus:ring-[#FF7F5C] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                            <i className="fa-solid fa-plus mr-2"></i>
                            ADD NEW
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
