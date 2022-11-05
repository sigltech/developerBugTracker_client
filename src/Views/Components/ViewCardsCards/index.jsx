import React from 'react'
import priorityController from '../../../Controllers/priorityController';

export default function ViewCardsCards(props) {
    const { name, priority, version } = props.bug;
    const { level, color } = priorityController(priority);

    const clicked = () => {
        props.clicked(name);
    }

    return (
        <div onClick={clicked} className=' text-sm md:text-md transition-all duration-300 cursor-pointer bug-card transform-scale-hover border-2 w-[95%] bg-[#2E2E3A] h-[10%] flex justify-between items-center rounded-md py-2 px-4 my-2' style={{ color: color }}>

            <h2 className="name w-[30%] rounded-md p-4 md:mx-3">{name}</h2>
            <h4 className="priority rounded-md p-4 md:mx-3">{level}</h4>
            <h5 className="version rounded-md p-4 mx-3">{version}</h5>
            <button onClick={clicked} className='md:button border-transparent border-2 w-[150px] rounded-md px-4 bg-[#E2856E] md:h-max h-max text-white md:mb-0 hover:border-[#E2856E] hover:bg-transparent hover:text-[#E2856E]'>Info</button>
        </div>
    )
}
