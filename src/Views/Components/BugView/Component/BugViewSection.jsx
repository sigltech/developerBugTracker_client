import React from 'react'
import './BugViewSection.css'

export default function BugViewSection(props) {



    return (
        <div className={props.info === 'completed' ? ' text-white m-[10px] p-[10px] rounded-[5px] text-center min-w-[40%] bg-green-600' : 'view-section'}>
            <h2 className={
                props.info === 'completed' ? 'mb-[15px] border-b-2 border-white' : 'mb-[15px] border-b-2 border-black'
            }>
                {props.title}
            </h2>
            <p>{props.info}</p>
        </div>
    )
}
