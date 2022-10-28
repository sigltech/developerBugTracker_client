import React from 'react'

export default function NewUserInfoModal(props) {
    return (
        <div id='new-user-details-popup'
            className={props.newUserModal ? 'absolute rounded-lg flex flex-col justify-center items-center right-22 h-[40%] bg-[#2E2E3A] w-[60%]' : 'hidden'}
            aria-hidden={props.newUserModal ? 'false' : 'true'}
        >
            <span onClick={() => props.setNewUserModal(!props.newUserModal)} className='absolute right-10 top-10 text-2xl cursor-pointer hover:text-[rgba(255,255,255,0.4)] transition-all duration-300'>X</span>
            <div className='my-4 text-center flex items-center'>
                <h2 className='text-3xl font-bold'>username:</h2>
                <p className='mx-4 border-2 px-6 py-2'>{props.newUser.name}</p>
            </div>
            <div className='my-4 text-center flex items-center'>
                <h2 className='text-3xl font-bold'>password:</h2>
                <p
                    onClick={props.copyToClipboard}
                    className='mx-4 border-2 px-6 py-2 hover:bg-[rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300'
                >
                    {props.newUser.password}
                </p>
            </div>
        </div>
    )
}
