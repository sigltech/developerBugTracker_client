import React from 'react'
import priorityController from '../../../Controllers/priorityController';

export default function ViewCardsCards(props) {
    const { name, priority, version } = props.bug;
    const { level, color } = priorityController(priority);

    const clicked = () => {
        props.clicked(name);
    }

    return (
        <div onClick={clicked} className='transition-all duration-300 cursor-pointer bug-card transform-scale-hover border-2 w-[95%] bg-[#2E2E3A] h-[10%] flex justify-between items-center rounded-md py-2 px-4 my-2' style={{ color: color }}>

            <h2 className="name w-[30%] rounded-md p-4 mx-3">{name}</h2>
            <h4 className="priority rounded-md p-4 mx-3">{level}</h4>
            <h5 className="version rounded-md p-4 mx-3">{version}</h5>
            <button onClick={clicked} className='button my-3'>Info</button>
        </div>
    )
}
