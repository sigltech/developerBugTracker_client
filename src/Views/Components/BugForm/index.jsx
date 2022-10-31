import React, { useState } from 'react'
import './BugForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { getBugsStatus } from '../../../Controllers/redux/bugSlice';
import Bug from '../../../Models/bugModel';
import { addBug, updateBug, fetchBugs } from '../../../Controllers/bugController';
import { getAllUsers } from '../../../Controllers/authController';
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

export default function BugForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bugObject, setBugObject] = useState(new Bug(props.bug));
    const [status, setStatus] = useState('idle');
    const [allUsers, setAllUsers] = useState([]);
    //eslint-disable-next-line
    const bugsStatus = useSelector(getBugsStatus);
    //eslint-disable-next-line
    const user = useSelector((state) => state.user);

    const inputChanged = (e) => {
        setBugObject({
            ...bugObject,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        dispatch(getAllUsers()).then((res) => {
            setAllUsers(res.payload);
        });
        //eslint-disable-next-line
    }, [setAllUsers, dispatch]);

    //eslint-disable-next-line
    const canSave =
        [
            bugObject.name,
            bugObject.details,
            bugObject.priority,
            bugObject.steps,
            bugObject.version
        ].every(Boolean) && bugObject.priority > 0 && bugObject.priority < 4 && status === 'idle';

    const submitCreateForm = (e) => {
        e.preventDefault();
        try {
            if (props.title === 'Edit Bug') {
                setStatus('loading');
                dispatch(updateBug(bugObject));
                setStatus('idle');
                dispatch(fetchBugs());
                navigate('/viewbugs');
                props.close();
            }
            else {
                setStatus('loading');
                bugObject._id = Math.random().toString(36).substr(2, 9);
                dispatch(addBug(bugObject));
                setStatus('idle');
                props.close();
            }

        } catch (error) {
            setStatus('failed');
        }
    }

    return (
        <div className='bug-create'>
            <h1>{props.title}</h1>
            {props.title === 'Edit Bug' && <span className='close-btn' onClick={props.close}>X</span>}
            <form>
                <label htmlFor="name" className='text-white'>Name:</label>
                <input
                    onChange={inputChanged}
                    value={bugObject.name}
                    type="text"
                    name='name'
                    id='name'
                    placeholder='bug name'
                    className='text-black'
                />
                <label htmlFor="description" className='text-white'>Description:</label>
                <textarea
                    className='text-black'
                    onChange={inputChanged}
                    value={bugObject.description}
                    name="description"
                    id="description"
                    cols="15"
                    rows="4"
                    placeholder='Detailed description of the bug' >
                </textarea>

                <label htmlFor="steps" className='text-white'>Steps:</label>
                <textarea
                    className='text-black'
                    onChange={inputChanged}
                    value={bugObject.steps}
                    name="steps"
                    id="steps"
                    cols="15"
                    rows="4"
                    placeholder='Steps to re-create the bug'
                    required
                ></textarea>
                <label htmlFor="priority" className='text-white'>Priority:</label>
                <select
                    className='text-black'
                    onChange={inputChanged}
                    value={bugObject.priority}
                    name="priority"
                    id="priority"
                    required
                >
                    <option value="3">Low</option>
                    <option value="2">Medium</option>
                    <option value="1">High</option>
                </select>
                <label htmlFor="assigned" className='text-white'>Assigned:</label>
                <select
                    className='text-black'
                    onChange={inputChanged}
                    value={bugObject.assigned}
                    name="assigned"
                    id="assigned"
                >
                    {allUsers.map((user, index) => {
                        return <option key={index} value={user.name}>{user.name}</option>
                    })}
                </select>
                <label htmlFor="version" className='text-white'>Application Version:</label>
                <input
                    className='text-black'
                    onChange={inputChanged}
                    value={bugObject.version}
                    type="text"
                    name='version'
                    id='version'
                    placeholder='Application Version number'
                />
                <button
                    onClick={submitCreateForm}
                    className='button'
                    type='submit'
                >
                    {status === 'loading' ?
                        <span><ReactLoading type='spin' color='white' height={20} width={20} /></span>
                        :
                        props.title === "Edit Bug" ? "Edit" : "Create"}
                </button>
            </form>
        </div>
    )
}
