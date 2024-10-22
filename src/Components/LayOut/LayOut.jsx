import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router'
import SideBar from '../SideBar/SideBar'

export default function LayOut() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}
