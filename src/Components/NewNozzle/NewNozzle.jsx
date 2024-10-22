import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function NewNozzle({ data, setData }) {
    const [formData, setFormData] = useState({ name: '', id: '', station: '', dispenser: '' });
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
        navigate('/Nozzle'); 
    };

    const handleCancel = () => {
        navigate('/Nozzle'); 
    };

  return (
    <div className='max-w-full max-h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#3D5161D9]'>
        <form onSubmit={handleSubmit} class=" p-4 mx-auto w-[60%] max-h-full -translate-y-2/4 -translate-x-2/4 absolute top-2/4 left-2/4 bg-[#FFFFFF] rounded-md">
            <div className='flex items-center justify-between border-b-2 border-[#B2BEC3] p-2 mb-5'>
                <div className='flex gap-2 '>
                    <i className="fa-solid fa-oil-can text-base"></i>
                    <p className='font-medium text-xs'> {location.state && location.state.index !== undefined ? 'Edit Nozzle' : 'Add New Nozzle'}</p>
                </div>
                <button type="button" onClick={handleCancel}><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div className='w-full h-full flex justify-end items-center p-5 flex-wrap gap-2'>
                <div class="w-[50%]">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Station name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required id="name" className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5" placeholder="Placeholder..."  />
                </div>
                <div class="w-[49%]">
                    <label for="id" className="block mb-2 text-sm font-medium text-gray-900 ">Channel ID</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} required id="id" className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5" placeholder="Placeholder..." />
                </div>
                <div className="w-[50%]">
                    <label htmlFor="station" className="block mb-2 text-sm font-medium text-gray-900">Station</label>
                    <select 
                        name="station" 
                        value={formData.station} 
                        onChange={handleChange} 
                        required 
                        id="station" 
                        className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5"
                    >
                        <option value="" disabled>Select a station...</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>    
                    </select>
                </div>
                <div className="w-[49%]">
                    <label htmlFor="dispenser" className="block mb-2 text-sm font-medium text-gray-900">Dispenser</label>
                    <select 
                        name="dispenser" 
                        value={formData.dispenser} 
                        onChange={handleChange} 
                        required 
                        id="dispenser" 
                        className="bg-gray-50 border border-[#3D5161] text-gray-900 text-sm rounded-lg focus:ring-[#3D5161] focus:border-[#3D5161] block w-full p-2.5"
                    >
                        <option value="" disabled>Select a dispenser...</option>
                        <option value="D1">Dispenser 1</option>
                        <option value="D2">Dispenser 2</option>
                        <option value="D3">Dispenser 3</option>
                    </select>
                </div>

                <div className='gap-4 flex'>
                    <button type="button" onClick={handleCancel} className="text-[#FF7F5C] border border-[#FF7F5C]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-9 py-2.5 text-center transition-all">Cancel</button>
                    <button type="submit" className="text-white bg-[#FF7F5C] hover:bg-[#ed6742] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all">
                        <i class="fa-regular fa-floppy-disk font-medium text-sm pr-4"></i>
                        {location.state && location.state.index !== undefined ? 'Update' : 'Submit'}
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}
