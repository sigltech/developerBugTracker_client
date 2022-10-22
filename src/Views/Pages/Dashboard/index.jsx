import React, { useState } from 'react'
import { Sidebar, DashboardComp, MobileMenu } from '../../Components/'
import { Outlet } from 'react-router-dom'
import './index.css'

export default function Dashboard() {


    return (
        <div className='dashboard-container flex w-screen h-screen'>
            <div className='w-[250px]'>
                <Sidebar />
            </div>
            <MobileMenu />
            <Outlet />
        </div>
    )
}
