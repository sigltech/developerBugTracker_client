import React, { useRef, useState } from 'react'
import './LoginPortal.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogin } from '../../../Controllers/authController';
import { authLoggedIn, authUser } from '../../../Controllers/redux/authSlice';
import { MdOutlineAccountCircle, MdOutlinePassword } from 'react-icons/md';

export default function LoginPortal() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const status = useRef('idle');
    const [error, setError] = useState(' ');

    const inputFocus = (e) => {
        e.target.parentElement.classList.add('focus');
    }

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
            dispatch(authLogin(formInput)).then((res) => {
                console.log(res);
                if (res.payload.data === undefined) {
                    status.current = 'idle';
                    setError(res.payload.message);
                    setTimeout(() => {
                        setError(' ');
                    }, 2000);
                }
            }).catch((err) => {
                setError(err);
            });
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
                        <div className='transition-all duration-300 relative input-containers flex items-center w-full bg-white rounded-md my-2 p-2'>
                            <span className='w-max mx-1 absolute'>
                                <MdOutlineAccountCircle className='text-4xl text-black' />
                            </span>
                            <input
                                type="text"
                                name='name'
                                placeholder='name'
                                className='w-full'
                                onChange={inputChanged}
                                value={formInput.name} required />
                        </div>
                        <div className='mb-4'>
                            <div className='transition-all duration-300 relative input-containers flex items-center w-full bg-white rounded-md my-2 p-2'>
                                <span className='w-max mx-1 absolute'>
                                    <MdOutlinePassword className='text-4xl text-black' />
                                </span>
                                <input
                                    className={error === ' ' ? 'w-full border-none m-0' : ' m-0w-full border-2 border-red-500'}
                                    type="password"
                                    name='password'
                                    placeholder='password'
                                    onChange={inputChanged}
                                    value={formInput.password}
                                    required
                                />
                            </div>
                            {error &&
                                <p className='text-red-500 aboslute'>{error}</p>
                            }
                        </div>
                        <button type='submit' className='button mb-0'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
