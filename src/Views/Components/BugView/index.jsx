import React, { useState } from 'react';
import './BugView.css';
import BugViewSection from './Component/BugViewSection';
import BugModel from '../../../Models/bugModel.js';
import { useDispatch, useSelector } from 'react-redux';
// import { markComplete } from '../../../Controllers/Redux/bugSlice';
import EditPanel from '../Edit&Delete/EditPanel';
import EditBug from '../BugForm';

export default function BugView(props) {
    const dispatch = useDispatch();
    const bug = new BugModel(props.bug);

    const closeView = () => {
        props.clicked();
    }

    const [displayEdit, setDisplayEdit] = useState(false);

    const editClicked = () => {
        setDisplayEdit(!displayEdit);
    }

    const deleteClicked = () => {
        props.editClicked();
    }

    return (
        <>
            <div className='bug-view'>
                <div className='bug-view-edit-btns'>
                    <EditPanel editClicked={editClicked} deleteClicked={deleteClicked} />
                </div>
                <div className='bug-view-header'>
                    <h1>{props.bug.name}</h1>
                    <span onClick={closeView}>X</span>
                </div>
                <BugViewSection title='Details' info={bug.details} />
                <BugViewSection title='Steps' info={bug.steps} />
                <BugViewSection title='Priority' info={bug.priority} />
                <BugViewSection title='App Version' info={bug.version} />
                <BugViewSection title='Created On' info={bug.time} />
                <button className='button' /*onClick={() => { dispatch(markComplete()) }}*/>Mark Complete</button>
            </div>
            {displayEdit && <EditBug close={editClicked} title='Edit Bug' bug={bug} />}
        </>
    )
}
