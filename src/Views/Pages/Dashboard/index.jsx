import React, { useEffect } from 'react'
import { Sidebar, DashboardComp, MobileMenu } from '../../Components/'
import { Outlet } from 'react-router-dom'
import './index.css'
import { selectAllBugs, getBugsStatus, getBugsError, getBugsLoading } from '../../../Controllers/redux/bugSlice';
import { fetchBugs } from '../../../Controllers/bugController';
import { useSelector, useDispatch } from 'react-redux';

export default function Dashboard() {
    const dispatch = useDispatch();

    const bugs = useSelector(selectAllBugs);
    const bugsStatus = useSelector(getBugsStatus);
    const bugsError = useSelector(getBugsError);

    useEffect(() => {
        dispatch(fetchBugs());
    }, [dispatch])

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
