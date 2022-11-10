import React from 'react';
import './EditPanel.css';

export default function EditPanel(props) {

    const btnClicked = () => {
        props.editClicked();
    }

    return (
        <div className='edit-panel'>
            <button onClick={btnClicked} className='button edit-btn'>Edit</button>
            {/* <button
                onClick={props.deleteClicked}
                className='button delete-btn'>Delete</button> */}
        </div>
    )
}
