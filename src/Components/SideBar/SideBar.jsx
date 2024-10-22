import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };
    const location = useLocation();

    const icons = [
        { icon: 'fa-gauge-simple-high', page: '/Mapview' },
        { icon: 'fa-brands fa-figma', page: '/DashboardGraph' },
        { icon: 'fa-layer-group', page: '/Station' },
        { icon: 'fa-gear', page: '*' }, 
        { icon: 'fa-bell', page: '/StationAlarm' },
    ];

    const getActiveButton = (pathname) => {
        const activeIndex = icons.findIndex(icon => icon.page === pathname);
        return activeIndex >= 0 ? activeIndex : 2; 
    };

    const [activeButton, setActiveButton] = useState(getActiveButton(location.pathname));

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    return (
        <div className='fixed top-0 left-0 h-full w-[5%]'>
            <div className="container flex items-center justify-around flex-col p-4 w-auto h-full bg-[#FF7F5C]">
                <div className="logo">
                    <i className="fa-solid fa-droplet text-[#F9F5F3] focus:text-[#FFFFFF] hover:text-[#2C3E50] transition-all text-5xl"></i>
                </div>
                <div className="barIcons flex items-center justify-around flex-col gap-4">
                    {icons.map((icon, index) => (
                        <Link
                            to={icon.page}
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={`transition-all text-2xl cursor-pointer ${activeButton === index ? 'text-[#2C3E50]' : ''}`}
                        >
                            <i
                                className={`fa-solid ${icon.icon} ${activeButton === index ? 'text-[#2C3E50]' : 'text-[#F9F5F3]'} hover:text-[#2C3E50]`}
                            ></i>
                        </Link>
                    ))}
                </div>
                    <button onClick={handleLogout} className="logout w-full">
                        <i className="fa-solid fa-arrow-right-from-bracket text-[#F9F5F3] focus:text-[#FFFFFF] transition-all hover:text-[#2C3E50] text-3xl"></i>
                    </button>
            </div>
        </div>
    );
}
