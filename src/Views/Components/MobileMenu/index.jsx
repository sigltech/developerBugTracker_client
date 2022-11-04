import React from 'react';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { AiOutlineBug } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MobileMenu() {
    const { user } = useSelector(state => state);
    return (
        <div className=' z-50 md:translate-y-[100%] fixed bottom-0 w-full bg-slate-600 h-24'>
            <div className='w-full grid grid-flow-col h-full'>
                <div
                    className='border-r-2 flex justify-center items-center h-full w-full'
                >
                    <Link to='/' className='flex items-center justify-center h-full w-full'>
                        <span className='nav-link-icon text-2xl mr-3'>
                            <MdOutlineSpaceDashboard />
                        </span>
                        <span>Dashboard</span>
                    </Link>
                </div>
                <div
                    className='border-r-2 flex justify-center items-center h-full w-full'
                >
                    <Link to='/viewbugs' className='flex items-center justify-center h-full w-full'>
                        <span className='nav-link-icon text-2xl mr-3'>
                            <AiOutlineBug />
                        </span>
                        <span>View Bugs</span>
                    </Link>
                </div>
                {user.admin &&
                    <div
                        className='border-r-2 flex justify-center items-center h-full w-full'
                    >
                        <Link to='/create' className='flex items-center justify-center h-full w-full'>
                            <span className='nav-link-icon text-2xl mr-3'>
                                <IoCreateOutline />
                            </span>
                            <span>Create Bug</span>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
