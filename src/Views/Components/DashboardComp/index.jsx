import React, { useEffect } from 'react'
import Card from '../DashboardInfoCard';
// import { useGetBugsQuery } from '../../../Controllers/Redux/ApiSlice';
import { selectAllBugs, getBugsStatus, getBugsError } from '../../../Controllers/redux/bugSlice';
import { fetchBugs } from '../../../Controllers/bugController';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardComp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { data, error, isLoading } = useGetBugsQuery();
    const bugs = useSelector(selectAllBugs);
    const bugsStatus = useSelector(getBugsStatus);
    //eslint-disable-next-line
    const bugsError = useSelector(getBugsError);

    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    const filterBugs = (priority) => {
        return bugs.filter(bug => bug.priority === priority);
    }
    if (bugs !== undefined) {
        highCount = filterBugs('1').length;
        mediumCount = filterBugs('2').length;
        lowCount = filterBugs('3').length;
    }

    const redirect = (path) => {
        navigate(path);
    }

    useEffect(() => {
        if (bugsStatus === 'idle') {
            dispatch(fetchBugs());
        }

    }, [bugs, bugsStatus, dispatch]);

    return (
        <div className="flex flex-wrap justify-around w-full p-10">
            <Card priority='1' count={highCount} clicked={() => redirect('/viewbugs')} />
            <Card priority='2' count={mediumCount} clicked={() => redirect('/viewbugs')} />
            <Card priority='3' count={lowCount} clicked={() => redirect('/viewbugs')} />
            <div>

            </div>
        </div>
    )
}

