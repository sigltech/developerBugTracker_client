import React, { useState } from 'react'
import './BugForm.css'
import { useDispatch, useSelector } from 'react-redux';
import Bug from '../../../Models/bugModel';
import { addBug } from '../../../Controllers/bugController';
import { getBugsLoading } from '../../../Controllers/redux/bugSlice';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';

export default function BugForm(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const loading = useSelector(getBugsLoading);
    const [bugObject, setBugObject] = useState(new Bug(props.bug));
    const [status, setStatus] = useState('idle');
    const [name, setName] = useState(props.bug.name);
    const [description, setDescription] = useState(props.bug.description);
    const [priority, setPriority] = useState(props.bug.priority);
    const [steps, setSteps] = useState(props.bug.steps);
    const [version, setVersion] = useState(props.bug.version);
    const [assigned, setAssigned] = useState(props.bug.assigned);
    const [creator, setCreator] = useState(props.bug.creator);
    const [time, setTime] = useState(props.bug.time);
    // bug inputs handlers


    const inputChanged = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'priority':
                setPriority(value);
                break;
            case 'steps':
                setSteps(value);
                break;
            case 'version':
                setVersion(value);
                break;
            case 'assigned':
                setAssigned(value);
                break;
            default:
                break;
        }
    }

    const canSave = [bugObject.name, bugObject.details, bugObject.priority, bugObject.steps, bugObject.version].every(Boolean) && bugObject.priority > 0 && bugObject.priority < 4 && status === 'idle';

    const submitCreateForm = (e) => {
        e.preventDefault();
        try {
            let id = nanoid();
            setStatus('loading');
            console.log(user.userData.data.name);
            const newBug = {
                _id: id,
                name: name,
                description: description,
                priority: priority,
                steps: steps,
                version: version,
                assigned: assigned,
                creator: user.userData.data.name,
                time: new Date().toISOString()
            };
            dispatch(addBug(newBug));
            console.log(newBug);
            console.log(user)
            setStatus('idle');
            navigate('/viewbugs');

        } catch (error) {
            setStatus('failed');
        }
    }

    return (
        <div className='bug-create'>
            <h1>{props.title}</h1>
            {props.title == 'Edit Bug' && <span className='close-btn' onClick={props.close}>X</span>}
            <form>
                <label htmlFor="name" className='text-white'>Name:</label>
                <input
                    onChange={inputChanged}
                    value={name}
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
                    value={description}
                    name="description"
                    id="description"
                    cols="15"
                    rows="4"
                    placeholder='Detailed description of the bug'
                >
                </textarea>
                <label htmlFor="steps" className='text-white'>Steps:</label>
                <textarea
                    className='text-black'
                    onChange={inputChanged}
                    value={steps}
                    name="steps"
                    id="steps"
                    cols="15"
                    rows="4"
                    placeholder='Steps to re-create the bug'
                    required
                >
                </textarea>
                <label htmlFor="priority" className='text-white'>Priority:</label>
                <select
                    className='text-black'
                    onChange={inputChanged}
                    value={priority}
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
                    value={assigned}
                    name="assigned"
                    id="assigned">
                    <option value="Richard Sigl">Richard Sigl</option>
                    <option value="John Doe">John Doe</option>
                </select>
                <label htmlFor="version" className='text-white'>Application Version:</label>
                <input
                    className='text-black'
                    onChange={inputChanged}
                    value={version}
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
                    {props.title === "Edit Bug" ? "Edit" : "Create"}
                </button>
            </form>
        </div>
    )
}
