import React, { useEffect, useState } from 'react'
import { Sidebar, MobileMenu, BurgerMenu } from '../../Components/'
import { Outlet } from 'react-router-dom'
import './index.css'
import { selectAllBugs, getBugsStatus, getBugsError } from '../../../Controllers/redux/bugSlice';
import { fetchBugs } from '../../../Controllers/bugController';
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const { user } = useSelector(state => state);
    //eslint-disable-next-line
    const bugs = useSelector(selectAllBugs);
    //eslint-disable-next-line
    const bugsStatus = useSelector(getBugsStatus);
    //eslint-disable-next-line
    const bugsError = useSelector(getBugsError);

    useEffect(() => {
        dispatch(fetchBugs());
    }, [dispatch])

    return (
        <div className='dashboard-container flex w-screen h-screen'>
            <GiHamburgerMenu onClick={() => setBurgerMenuOpen(!burgerMenuOpen)} className='fixed z-[99999] cursor-pointer left-4 top-4 md:hidden text-5xl text-[#E2856E] mt-4 ml-4' />
            <BurgerMenu user={user} setMenu={setBurgerMenuOpen} menuOpen={burgerMenuOpen} />
            <div className='w-[250px]'>
                <Sidebar />
            </div>
            <MobileMenu />
            <Outlet />
        </div>
    )
}
