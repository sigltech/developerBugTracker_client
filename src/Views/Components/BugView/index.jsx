import React, { useState } from 'react';
import './BugView.css';
import BugViewSection from './Component/BugViewSection';
import BugModel from '../../../Models/bugModel.js';
import { useDispatch, useSelector } from 'react-redux';
// import { markComplete } from '../../../Controllers/Redux/bugSlice';
import EditPanel from '../Edit&Delete/EditPanel';
import EditBug from '../BugForm';
import { updateBug } from '../../../Controllers/bugController';

export default function BugView(props) {
    const dispatch = useDispatch();
    const bug = new BugModel(props.bug);
    const { user } = useSelector(state => state);

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
    console.log(bug);

    const handleBugStatus = (e) => {
        dispatch(updateBug({ ...bug, status: 'completed' }));
    }

    const closeAll = () => {
        closeView();
    }
    return (
        <>
            <div className='bug-view'>
                <div className='bug-view-header'>
                    <div className='bug-view-edit-btns'>
                        {user.admin === true && <EditPanel editClicked={editClicked} deleteClicked={deleteClicked} />}
                    </div>
                    <h1>{props.bug.name}</h1>
                    <span onClick={closeView}>X</span>
                </div>
                <BugViewSection title='Description' info={bug.description} />
                <BugViewSection title='Steps' info={bug.steps} />
                <BugViewSection title='Priority' info={bug.priority} />
                <BugViewSection title='App Version' info={bug.version} />
                <BugViewSection title='Created On' info={bug.time} />
                <BugViewSection title='status' info={bug.status} />
                <button className='button' onClick={handleBugStatus}>Mark Complete</button>
            </div>
            {displayEdit && <EditBug closeAll={closeAll} close={editClicked} title='Edit Bug' bug={bug} />}
        </>
    )
}
