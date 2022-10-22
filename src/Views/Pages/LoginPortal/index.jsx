import React, { useRef, useState } from 'react'
import './LoginPortal.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogin } from '../../../Controllers/authController';
import { authLoggedIn, authUser } from '../../../Controllers/redux/authSlice';

export default function LoginPortal() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const status = useRef('idle');

    const [formInput, setFormInput] = useState({
        name: '',
        password: ''
    });

    const inputChanged = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        try {
            status.current = 'loading';
            dispatch(authLogin(formInput));
            // set user data to local storage for persisting login
            status.current = 'idle';

        } catch (error) {
            console.log(error);
            status.current = 'failed';
        }

    }

    return (
        <div className='login-page-container flex items-center justify-center'>
            <div className='login-panel relative flex justify-center border-2 w-[60vw] h-[60vh] bg-[rgb(0,15,8,0.7)]'>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-bold text-white'>Login Portal</h1>
                    <form onSubmit={handleLoginSubmit} className='w-[80%] h-[90%]'>
                        <input
                            type="text"
                            name='name'
                            placeholder='name'
                            onChange={inputChanged}
                            value={formInput.name} required />
                        <input className='my-5' type="password" name='password' placeholder='password' onChange={inputChanged} value={formInput.password} required />
                        <button type='submit' className='button'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
