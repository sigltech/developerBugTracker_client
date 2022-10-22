import React from 'react';
import './EditPanel.css';

export default function EditPanel(props) {
    return (
        <div className='edit-panel'>
            <button onClick={props.editClicked} className='button edit-btn'>Edit</button>
            <button
                onClick={props.deleteClicked}
                className='button delete-btn'>Delete</button>
        </div>
    )
}
