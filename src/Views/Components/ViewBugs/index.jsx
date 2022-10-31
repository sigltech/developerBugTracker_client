import React, { useState } from 'react'
import DashboardCards from '../ViewCardsCards'
import { selectAllBugs, getBugsStatus, getBugsError, getBugsLoading } from '../../../Controllers/redux/bugSlice';
import { fetchBugs } from '../../../Controllers/bugController';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BugView from '../BugView';
import bug from '../../../Models/bugModel';

export default function ViewBugs() {
    const dispatch = useDispatch();
    const bugs = useSelector(selectAllBugs);
    //eslint-disable-next-line
    const bugsStatus = useSelector(getBugsStatus);
    //eslint-disable-next-line
    const bugsError = useSelector(getBugsError);
    //eslint-disable-next-line
    const bugsLoading = useSelector(getBugsLoading);
    // state to manage the sorting of bugs
    const [sort, setSort] = useState('all');

    const [DISPLAY_BUG, SET_DISPLAY_BUG] = useState({
        name: '',
        isDisplayed: false
    });

    // set the bug to display in the info modal
    const bugClicked = (name) => {
        SET_DISPLAY_BUG({
            isDisplayed: !DISPLAY_BUG.isDisplayed,
            name: name
        })
    }

    useEffect(() => {
        dispatch(fetchBugs());

    }, [dispatch])

    // sort the bugs by status
    const sortBugs = (status) => {
        setSort(status);
    }

    return (
        <>
            <div className='w-full p-10 overflow-x-hidden'>
                <select onChange={(e) => setSort(e.target.value)} className='text-black outline-none ml-9'>
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="completed">completed</option>

                </select>
                <div className='p-2 h-full overflow-y-scroll w-full flex flex-col justify-start items-center gap-1'>
                    {bugs && bugs.filter((bug) => {
                        if (sort === 'all') {
                            return bug;
                        } else if (sort === 'open') {
                            return bug.status === 'open';
                        } else {
                            return bug.status === 'completed';
                        }
                    }).map((bug, index) => {
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


