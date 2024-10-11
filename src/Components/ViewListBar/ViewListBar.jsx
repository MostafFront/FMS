import React from 'react'
import { Link,NavLink } from 'react-router-dom'

export default function ViewListBar() {
  return (
    <div className='absolute top-0 left-0 h-[10%] w-[100%] bg-[#FFFFFF]'>
      <div className="container flex justify-between items-center ">
        <div className='flex justify-center items-center gap-2 p-5' >
            <div className='flex justify-center items-end gap-1'>
                <span className='p-1 mr-1 rounded-full bg-[#FF7F5C]'></span>
                <i className="fa-solid fa-car-tunnel text-3xl"></i>   
            </div>
            <p className='font-medium text-2xl'>2/3</p>
            <p className='w-[10%] font-normal text-sm text-[#3D5161]'>Monitored stations</p>
        </div>
        <div className='bg-[#c3c3c2] flex justify-center items-center  rounded-2xl'>
          <NavLink
            to="/Mapview"
            className={({ isActive }) =>
              `px-5 py-1 rounded-2xl font-medium text-sm ${
                isActive ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'text-[#3D5161]'
              }`
            }
          >
            Map View
          </NavLink>
          <NavLink
            to="/ListView"
            className={({ isActive }) =>
              `px-5 py-1 rounded-2xl font-medium text-sm ${
                isActive ? 'bg-[#FF7F5C] text-[#FFFFFF]' : 'text-[#3D5161]'
              }`
            }
          >
            List View
          </NavLink>
        </div>
        <div className='flex justify-center items-center gap-2 p-5' >
            <div className='flex justify-center items-end gap-1'>
                <span className='p-1 mr-1 rounded-full bg-[#FF7F5C]'></span>
                <i className="fa-solid fa-rotate-right text-3xl"></i>  
            </div>
            <p className='font-medium text-2xl'>20s</p>
            <p className='w-[10%] font-normal text-sm'>Last Update</p>
        </div>
      </div>
    </div>
  )
}
