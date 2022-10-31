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

    // state to manage the sorting of bugs
    const [filters, setFilters] = useState({
        name: '',
        priority: '',
        status: 'all',
    });

    const resetFilters = () => {
        setFilters({
            name: '',
            priority: '',
            status: 'all',
        });
    }

    const changeFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    const user = useSelector((state) => state.user);

    const [DISPLAY_BUG, SET_DISPLAY_BUG] = useState({
        name: '',
        isDisplayed: false
    });

    // set the bug to display in the info modal
    //eslint-disable-next-line
    const bugClicked = (name) => {
        SET_DISPLAY_BUG({
            isDisplayed: !DISPLAY_BUG.isDisplayed,
            name: name
        })
    }

    useEffect(() => {
        dispatch(fetchBugs());
    }, [dispatch, bugClicked]);

    return (
        <>
            <div className='w-full p-10 overflow-x-hidden'>
                <div className='flex items-end h-max'>
                    <div className='flex flex-col ml-9'>
                        <label htmlFor="status">Status:</label>
                        <select name='status' value={filters.status} onChange={changeFilters} className='text-black outline-none mt-0'>
                            <option value='all'>status</option>
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="completed">completed</option>

                        </select>
                    </div>
                    <div className='flex flex-col ml-9'>
                        <label htmlFor="status">Assignee:</label>
                        <select name='name' value={filters.name} onChange={changeFilters} className='text-black outline-none mt-0'>
                            <option value="">All</option>
                            <option value={user.userData.data.name}>Assigned to Me</option>
                        </select>
                    </div>
                    <div className='flex justify-end items-center flex-col ml-9'>
                        <button className='border-2 border-transparent bg-[#E2856E] rounded-md py-[3px] px-[20px] hover:bg-transparent hover:border-[#E2856E] transition-all duration-300 font-bold m-0' onClick={resetFilters}>Reset Filters</button>
                    </div>
                </div>
                <div className='p-2 h-full overflow-y-scroll w-full flex flex-col justify-start items-center gap-1'>
                    {bugs && bugs.filter((bug) => {
                        const status = filters.status
                        const name = filters.name
                        return (
                            (status === 'all' || bug.status === status) &&
                            (name === '' || bug.assigned === name)
                        )
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


