import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { AiOutlineBug } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { HiOutlineUserAdd } from 'react-icons/hi';
// import { CgArrowsExpandRight, CgLogOut } from 'react-icons/cg';

export default function BurgerMenu(props) {
    return (
        <div
            className={props.menuOpen ? 'top-0 z-[99] flex justify-center items-center w-screen h-full absolute bg-[rgba(0,0,0,0.8)] overflow-hidden' : 'hidden'}>
            <div>
                <ul>
                    <li>
                        <Link onClick={() => props.setMenu(!props.menuOpen)} className='nav-Link flex items-center text-4xl font-normal mt-5 hover:underline' to='/'>
                            <span className='nav-link-icon mr-3'>
                                <MdOutlineSpaceDashboard />
                            </span>
                            <span className='nav-link-text animation-appear'>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => props.setMenu(!props.menuOpen)} className='nav-Link flex items-center text-4xl font-normal mt-5 hover:underline' to='/viewbugs'>
                            <span className='nav-link-icon mr-3'>
                                <AiOutlineBug />
                            </span>
                            <span className='nav-link-text animation-appear'>View Bugs</span>
                        </Link>
                    </li>
                    {props.user.admin &&
                        <li>
                            <Link onClick={() => props.setMenu(!props.menuOpen)} className='nav-Link flex items-center text-4xl font-normal mt-5 hover:underline' to='/create'>
                                <span className='nav-link-icon mr-3'>
                                    <IoCreateOutline />
                                </span>
                                <span className='nav-link-text animation-appear'>Create Bug</span>
                            </Link>
                        </li>}
                    {props.user.admin &&
                        <li>
                            <Link onClick={() => props.setMenu(!props.menuOpen)} className='nav-Link flex items-center text-4xl font-normal mt-5 hover:underline' to='/registerNewUser'>
                                <span className='nav-link-icon mr-3'>
                                    <HiOutlineUserAdd />
                                </span>
                                <span className='nav-link-text animation-appear'>Register User</span>
                            </Link>
                        </li>}
                </ul>
            </div>
        </div>
    )
}
