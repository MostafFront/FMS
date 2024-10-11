import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function NewStation({ data, setData }) {
    const [formData, setFormData] = useState({ name: '', id: '', location: '', description: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.station) {
            setFormData(location.state.station);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.state && location.state.index !== undefined) {
            const updatedData = data.map((item, i) => (i === location.state.index ? formData : item));
            setData(updatedData);
        } else {
            setData([...data, formData]); 
        }
        navigate('/Station'); 
    };

    const handleCancel = () => {
        navigate('/Station'); 
    };

    return (
        <div className='max-w-full max-h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#3D5161D9]'>
            <form onSubmit={handleSubmit} className="p-4 mx-auto w-[60%] max-h-full -translate-y-2/4 -translate-x-2/4 absolute top-2/4 left-2/4 bg-[#FFFFFF] rounded-md">
                <div className='flex items-center justify-between border-b-2 border-[#B2BEC3] p-2 mb-5'>
                    <div className='flex gap-2'>
                        <i className="fa-solid fa-car-tunnel text-base"></i>
                        <p className='font-medium text-xs'>{location.state && location.state.index !== undefined ? 'Edit Station' : 'Add New Station'}</p>
                    </div>
                    <button type="button" onClick={handleCancel}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className='w-full h-full flex justify-end items-center p-5 flex-wrap gap-2'>
                    <div className="w-[50%]">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Station Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required id="name" className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5" />
                    </div>
                    <div className="w-[49%]">
                        <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">Channel ID</label>
                        <input type="text" name="id" value={formData.id} onChange={handleChange} required id="id" className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required id="location" className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required id="description" className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5" />
                    </div>
                    <div className='gap-4 flex'>
                        <button type="button" onClick={handleCancel} className="text-[#FF7F5C] border border-[#FF7F5C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-9 py-2.5">Cancel</button>
                        <button type="submit" className="text-white bg-[#FF7F5C] hover:bg-[#ed6742] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
                            <i className="fa-regular fa-floppy-disk font-medium text-sm pr-4"></i>
                            {location.state && location.state.index !== undefined ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

