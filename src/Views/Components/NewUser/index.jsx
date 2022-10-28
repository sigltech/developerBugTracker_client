import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from '../../../Controllers/authController';
import NewUserInfoModal from '../NewUserInfoModal';

export default function NewUser() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state);
    const [newUser, setNewUser] = useState({
        name: '',
        password: '',
    });
    const [newUserModal, setNewUserModal] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        password: '',
        role: ''
    });

    const inputChanged = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authRegister(userData)).then((res) => {
            setNewUser(res.payload.user);
        });

        setUserData({
            name: '',
            password: '',
            role: ''
        });

        // display success message with user's temp password
        setNewUserModal(!newUserModal); // display modal with user's temp password

    };

    const copyToClipboard = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(e.target.innerHTML); // copy to clipboard
        console.log('copied to clipboard!'); // display success message
    }

    return (
        <div className='w-full'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <NewUserInfoModal newUser={newUser} newUserModal={newUserModal} setNewUserModal={setNewUserModal} copyToClipboard={copyToClipboard} />
                <div className='h-[75%] w-[85%] flex flex-col items-center justify-start'>
                    <h1 className='text-5xl'>New User</h1>
                    <div>
                        <p className='my-4 text-center border-2 rounded-md px-4 py-2'>
                            <i className='text-red-600'><strong>**Please Note**</strong></i>
                            <br />
                            <i className=''>The password is randomly generated and will be displayed on the screen. Once you create the user. Please <strong className='text-red-600'> keep it somewhere safe</strong> for the user. They will be able to change it after logging in for the first time </i>
                        </p>
                    </div>
                    <form
                        className='flex flex-col w-[95%] h-[95%] justify-start items-center'
                        onSubmit={handleSubmit}
                    >
                        <div
                            className='flex flex-col items-start justify-center my-2'
                        >
                            <label
                                htmlFor="name"
                                className='text-2xl my-2'
                            >
                                Name
                            </label>
                            <input
                                onChange={inputChanged}
                                value={user.name}
                                name='name'
                                type="text"
                                className='text-black rounded-md w-52 px-4 py-1'
                                placeholder={"User's name..."}
                                required
                            />
                        </div>
                        <div className='flex flex-col items-center justify-center my-2'>
                            <label
                                htmlFor="role"
                                className='text-2xl my-2'
                            >
                                Select a User Role
                            </label>

                            <select
                                className='text-black m-0 my-2 w-52'
                                onChange={inputChanged}
                                value={user.role}
                                name="role"
                                id="role"
                                required
                            >
                                <option>Please Select</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <button
                            className='button w-52 my-2'
                        >
                            Create User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
