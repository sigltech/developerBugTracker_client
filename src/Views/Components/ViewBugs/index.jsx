import React, { useState } from 'react'
import DashboardCards from '../ViewCardsCards'
import { selectAllBugs, getBugsStatus, getBugsError, getBugsLoading } from '../../../Controllers/redux/bugSlice';
import { fetchBugs } from '../../../Controllers/bugController';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BugView from '../BugView';

export default function ViewBugs() {
    const dispatch = useDispatch();
    const bugs = useSelector(selectAllBugs);
    //eslint-disable-next-line
    const bugsStatus = useSelector(getBugsStatus);
    //eslint-disable-next-line
    const bugsError = useSelector(getBugsError);
    //eslint-disable-next-line
    const bugsLoading = useSelector(getBugsLoading);

    const [DISPLAY_BUG, SET_DISPLAY_BUG] = useState({
        name: '',
        isDisplayed: false
    });

    const bugClicked = (name) => {
        SET_DISPLAY_BUG({
            isDisplayed: !DISPLAY_BUG.isDisplayed,
            name: name
        })
    }

    useEffect(() => {
        dispatch(fetchBugs());

    }, [dispatch])

    return (
        <>
            <div className='w-full p-10 overflow-x-hidden'>
                <div className='p-2 h-full overflow-y-scroll w-full flex flex-col justify-start items-center gap-1'>
                    {bugs && bugs.map((bug, index) => {
                        return (
                            <DashboardCards key={index} clicked={bugClicked} title={bug.name} details={bug.details} bug={bug} priority={bug.priority} />
                        )
                    })}
                </div>
                {DISPLAY_BUG.isDisplayed && <BugView clicked={bugClicked} bug={bugs.filter((bug) => bug.name === DISPLAY_BUG.name)[0]} />}
            </div>
        </>

    )
}


