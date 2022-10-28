import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const base_URL = 'http://localhost:5050/api/';


export const fetchBugs = createAsyncThunk('bugs/fetchBugs', async () => {
    try {
        const response = await axios.get(base_URL + 'tickets');
        let sorted = response.data.sort((a, b) => {
            return a.priority - b.priority;
        });
        return sorted;
    } catch (error) {
        return error.message;
    }
});

export const addBug = createAsyncThunk('bugs/addBug', async (bug) => {
    bug.time = new Date().toLocaleString();
    bug.status = 'open';
    try {
        var config = {
            method: 'post',
            url: base_URL + 'tickets/ticket',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: bug
        };

        axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        return error.message;
    }
});

export const updateBug = createAsyncThunk('bugs/updateBug', async (bug) => {
    try {
        var config = {
            method: 'put',
            url: base_URL + 'tickets/ticket',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: bug
        };

        axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        return error.message;
    }
});
