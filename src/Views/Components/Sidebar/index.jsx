import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { AiOutlineBug } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
//eslint-disable-next-line
import { FiMinimize2 } from 'react-icons/fi';
import { HiOutlineUserAdd } from 'react-icons/hi';
//eslint-disable-next-line
import { CgArrowsExpandRight, CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';


export default function Sidebar(props) {
    const navigate = useNavigate();

    //eslint-disable-next-line
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const username = window.localStorage.getItem('BT_name');
    const { user } = useSelector(state => state);

    return (
        <div className='sidebar-container hidden md:flex grid-cols-1 bg-[#2E2E3A] w-[250px] h-screen flex-col items-center'>
            <h1 className='mt-4 text-2xl text-center'>Hello, <br /> <span className='font-bold text-[#E2856E] underline'>{username}</span></h1>
            <div className='mt-[10rem]'>
                <ul>
                    <li>
                        <Link className='nav-Link flex items-center text-2xl font-normal mt-5 hover:underline' to='/'>
                            <span className='nav-link-icon mr-3'>
                                <MdOutlineSpaceDashboard />
                            </span>
                            {sidebarOpen && <span className='nav-link-text animation-appear'>Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link className='nav-Link flex items-center text-2xl font-normal mt-5 hover:underline' to='/viewbugs'>
                            <span className='nav-link-icon mr-3'>
                                <AiOutlineBug />
                            </span>
                            {sidebarOpen && <span className='nav-link-text animation-appear'>View Bugs</span>}
                        </Link>
                    </li>
                    {user.admin &&
                        <li>
                            <Link className='nav-Link flex items-center text-2xl font-normal mt-5 hover:underline' to='/create'>
                                <span className='nav-link-icon mr-3'>
                                    <IoCreateOutline />
                                </span>
                                {sidebarOpen && <span className='nav-link-text animation-appear'>Create Bug</span>}
                            </Link>
                        </li>}
                    {user.admin &&
                        <li>
                            <Link className='nav-Link flex items-center text-2xl font-normal mt-5 hover:underline' to='/registerNewUser'>
                                <span className='nav-link-icon mr-3'>
                                    <HiOutlineUserAdd />
                                </span>
                                {sidebarOpen && <span className='nav-link-text animation-appear'>Register User</span>}
                            </Link>
                        </li>}
                </ul>
            </div>
            <div className='absolute bottom-10 sidebar-admin-btns flex flex-col '>
                {sidebarOpen ?
                    <button onClick={() => navigate('/usersettings')} className="button nav-link logout animation-appear">Settings</button>
                    :
                    <span className='nav-link-icon'>
                        <CgLogOut fontSize={'30px'} />
                    </span>
                }
                {sidebarOpen ?
                    <button className="button nav-link logout animation-appear" onClick={props.signOut}>Logout</button>
                    :
                    <span className='nav-link-icon' onClick={props.signOut}>
                        <CgLogOut fontSize={'30px'} />
                    </span>
                }
            </div>
        </div>
    )
}
