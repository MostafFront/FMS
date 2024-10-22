import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="NavBar absolute top-0 left-0 w-full flex justify-center items-center z-10">
      <div className="container flex justify-around items-center w-[70%] h-auto">
        <NavLink
          to="/Station"
          className={({ isActive }) =>
            `flex justify-center items-center gap-3 p-8 rounded-b-xl cursor-pointer transition-all ${
              isActive ? 'bg-[#FF7F5C]' : 'bg-[#F4DBD4]'
            }`
          }
        >
          <i className="fa-solid fa-car-tunnel text-5xl"></i>
          <p className="font-medium text-2xl ">Stations</p>
        </NavLink>
        <NavLink
          to="/Dispenser"
          className={({ isActive }) =>
            `flex justify-center items-center gap-3 p-8 rounded-b-xl cursor-pointer transition-all ${
              isActive ? 'bg-[#FF7F5C]' : 'bg-[#F4DBD4]'
            }`
          }
        >
            <i className="fa-solid fa-gas-pump text-5xl"></i>
            <p className="font-medium text-2xl">Dispenser</p>
        </NavLink>
        <NavLink
          to="/Compressor"
          className={({ isActive }) =>
            `flex justify-center items-center gap-3 p-8 rounded-b-xl cursor-pointer transition-all ${
              isActive ? 'bg-[#FF7F5C]' : 'bg-[#F4DBD4]'
            }`
          }
        >
          <i className="fa-solid fa-compress text-5xl"></i>
          <p className="font-medium text-2xl">Compressor</p>
        </NavLink>
        <NavLink
          to="/Nozzle"
          className={({ isActive }) =>
            `flex justify-center items-center gap-3 p-8 rounded-b-xl cursor-pointer transition-all ${
              isActive ? 'bg-[#FF7F5C]' : 'bg-[#F4DBD4]'
            }`
          }
        >
          <i className="fa-solid fa-oil-can text-5xl"></i>
          <p className="font-medium text-2xl">Nozzle</p>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;