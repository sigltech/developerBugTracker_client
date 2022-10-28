import React, { useState } from 'react'
import './LoginPortal.css'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from '../../../Controllers/authController';
import { MdOutlineAccountCircle, MdOutlinePassword } from 'react-icons/md';
import ReactLoading from 'react-loading';

export default function LoginPortal() {
    const dispatch = useDispatch();
    //eslint-disable-next-line
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(' ');

    //eslint-disable-next-line
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
            setLoading(true);
            dispatch(authLogin(formInput)).then((res) => {
                if (res.payload.data === undefined) {
                    setLoading(false);
                    setError(res.payload.message);
                    setTimeout(() => {
                        setError(' ');
                    }, 2000);
                }
            }).catch((err) => {
                setError(err);
                setLoading(false);
            });
            // set user data to local storage for persisting login
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
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
                        <button type='submit' className='button mb-0'>
                            {loading ?
                                <ReactLoading type='spin' color='white' height={30} width={30} /> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
