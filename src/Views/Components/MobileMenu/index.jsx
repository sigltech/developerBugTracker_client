import React from 'react';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { AiOutlineBug } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MobileMenu(props) {
    const navigate = useNavigate();
    const { user } = useSelector(state => state);
    return (
        <div className=' z-50 md:translate-y-[100%] fixed bottom-0 w-full bg-slate-600 h-24'>
            <div className='w-full grid grid-flow-col h-full'>
                <div onClick={() => navigate('/')} className='border-r-2 flex justify-center items-center h-full w-full'>
                    <button className='flex items-center justify-center h-full w-full'>
                        <span className='nav-link-icon text-2xl mr-3'>
                            <MdOutlineSpaceDashboard />
                        </span>
                        <span>Dashboard</span>
                    </button>
                </div>
                <div onClick={() => navigate('/viewbugs')} className='border-r-2 flex justify-center items-center h-full w-full'>
                    <button className='flex items-center justify-center h-full w-full'>
                        <span className='nav-link-icon text-2xl mr-3'>
                            <AiOutlineBug />
                        </span>
                        <span>View Bugs</span>
                    </button>
                </div>
                {user.admin &&
                    <div onClick={() => navigate('create')} className='border-r-2 flex justify-center items-center h-full w-full'>
                        <button className='flex items-center justify-center h-full w-full'>
                            <span className='nav-link-icon text-2xl mr-3'>
                                <IoCreateOutline />
                            </span>
                            <span>Create Bug</span>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
