import React from 'react';
import PriorityController from '../../../Controllers/priorityController';
import './index.css';

export default function DashboardInfoCard(props) {
    const { level, color } = PriorityController(props.priority);

    return (
        <div className='totalbugs-info-card transform-scale-hover cursor-pointer transition-all duration-300 dashboard-card border-2 w-[250px] my-2 h-[250px] rounded-md bg-[#2E2E3A] flex flex-col items-center justify-start' onClick={props.clicked} style={{ color: color }}>
            <h2 className='my-9 text-3xl'>Total: {level}</h2>
            <p className='text-3xl my-3'>{props.count}</p>
        </div>
    )
}
