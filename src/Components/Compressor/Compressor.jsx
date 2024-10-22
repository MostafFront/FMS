import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { Link, useNavigate } from 'react-router-dom';

export default function Compressor({ data, setData }) {
    const [filter, setFilter] = useState("Station Filter");
    const navigate = useNavigate();

    const handleDelete = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleEdit = (index) => {
        const stationToEdit = data[index];
        navigate('/NewCompressor', { state: { station: stationToEdit, index } });
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter the data based on the selected filter
    const filteredData = filter === "Station Filter" ? data : data.filter(item => item.station === filter);

    return (
        <>
            <NavBar />
            <SideBar />
            <div className='h-full pt-[10%] w-[95%] absolute right-0 bottom-0 justify-center items-start flex bg-[#F9F5F3]'>
                <div className='flex flex-col w-[80%] min-h-full justify-start items-end'>
                    <div className='flex-col-reverse flex mb-6'>
                        <select 
                            id="station-filter" 
                            className="cursor-pointer drop-shadow-xl bg-[#FFFFFF] border border-[#00000029] text-[#3D5161] text-sm rounded-lg focus:ring-[#00000029] focus:border-[#00000029] font-medium w-full py-2 px-7"
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <option value="Station Filter" disabled>Station Filter</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>

                        </select>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full overflow-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                        <table className="w-full text-sm text-left rtl:text-right bg-[#FFFFFF]">
                            <thead className="text-xs text-[#707070] border-b border-[#B2BEC3]">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Compressor Name</th>
                                    <th scope="col" className="px-6 py-3">Channel ID</th>
                                    <th scope="col" className="px-6 py-3">Station</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">There is no info</td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="border-b text-[#707070]">
                                            <td className='flex justify-start items-center px-6 py-4'>
                                                <span className='p-1 mr-2 rounded-full bg-[#FF7F5C]'></span>
                                                <span className='font-medium'>{item.name}</span>
                                            </td>
                                            <td className="px-6 py-4">{item.id}</td>
                                            <td className="px-6 py-4">{item.station}</td>
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
                        <Link to={'/NewCompressor'} className="text-white bg-[#FF7F5C] hover:bg-[#f56b44] focus:ring-4 focus:ring-[#FF7F5C] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                            <i className="fa-solid fa-plus mr-2"></i>
                            ADD NEW
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
