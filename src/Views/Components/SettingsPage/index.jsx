import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { checkPassword, updateUser } from '../../../Controllers/authController';


export default function SettingsPage(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [oldPasswordConfirm, setOldPasswordConfirm] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [passChangeSuccess, setPassChangeSuccess] = useState(false);

    const checkPasswordMatch = (e) => {
        setPasswordConfirm(e.target.value);
        if (e.target.value === password) {
            setPasswordMatch(true);
        }
    }

    const checkOldPassword = (e) => {
        setOldPassword(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();

        console.log('form submitted');

        dispatch(checkPassword({
            password: oldPassword,
            name: props.user.userData.data.name
        })).then((res) => {
            if (res.payload.message === 'Password is correct') {
                setOldPasswordConfirm(true);
            } else {
                setOldPasswordConfirm(false);
            }

            // if old password is correct, update password
            if (passwordMatch && oldPasswordConfirm === true) {
                dispatch(updateUser({
                    name: props.user.userData.data.name,
                    password: password
                })).then((res) => {
                    setPassChangeSuccess(true);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <div className='h-full w-full' >
            <div className='text-center'>

                <div className='w-full flex justify-center mt-10'>
                    <form onSubmit={submitForm} className='flex flex-col w-[50%] items-center]'>
                        <label className='text-2xl' htmlFor="name">Name</label>
                        <input
                            type="text"
                            name='name'
                            className='px-4 py-2 text-black text-md rounded-md'
                            value={props.user.userData.data.name}
                        />
                        <label className='text-2xl' htmlFor="oldpassword">Old password</label>
                        <input
                            onChange={checkOldPassword}
                            value={oldPassword}
                            type="password"
                            name='oldpassword'
                            className='px-4 py-2 text-black text-md rounded-md'

                        />
                        <div className=' w-full flex flex-col my-10 border-2 px-10 py-12'>
                            <label className='text-2xl' htmlFor="newpassword">New password</label>
                            <div
                                className={passwordMatch ? 'flex items-center border-2 rounded-md bg-white border-green-500' : 'flex items-center border-2 rounded-md bg-white px-2 border-red-500'}
                            >
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='newpassword'
                                    type={showPassword ? 'text' : 'password'}
                                    name='newpassword'
                                    className='outline-none px-2 py-2 w-full text-black text-md'

                                />
                                <span
                                    name='hidden'
                                    className='cursor-pointer mx-2 text-black'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {!showPassword ? <AiOutlineEye
                                        className='text-2xl'
                                    /> : <AiOutlineEyeInvisible className='text-2xl' />}
                                </span>
                            </div>
                            <label className='text-2xl' htmlFor="retrynewpassword">Re-enter new password</label>
                            <div className={passwordMatch ? 'flex items-center border-2 rounded-md bg-white border-green-500' : 'flex items-center border-2 rounded-md bg-white px-2 border-red-500'}>
                                <input
                                    value={passwordConfirm}
                                    onChange={checkPasswordMatch}
                                    id='retrynewpassword'
                                    type={showPassword2 ? 'text' : 'password'}
                                    name='retrynewpassword'
                                    className='outline-none px-4 py-2 text-black text-md w-full'
                                />
                                <span
                                    name='hidden'
                                    className='cursor-pointer mx-2 text-black'
                                    onClick={() => setShowPassword2(!showPassword2)}
                                >
                                    {!showPassword2 ? <AiOutlineEye
                                        className='text-2xl'
                                    /> : <AiOutlineEyeInvisible className='text-2xl' />}
                                </span>
                            </div>
                        </div>
                        <button className='button'>Update</button>
                        {passChangeSuccess && <p className='text-green-500'>Password changed successfully</p>}
                        {oldPasswordConfirm === false && <p className='text-red-500'>Old password is incorrect</p>}
                    </form>
                </div>
            </div >
        </div >
    )
}
