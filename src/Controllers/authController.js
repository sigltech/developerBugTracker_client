import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const base_URL = 'http://127.0.0.1:5050/api/auth/users';

export const authLogin = createAsyncThunk('user/authLogin', async (user) => {
    try {
        const response = await axios.post(base_URL + "/login", user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // send token and user data to local storage
        window.localStorage.setItem('BT_token', response.data.token);
        window.localStorage.setItem('BT_name', response.data.data.name);
        window.localStorage.setItem('BT_role', response.data.data.role);

        // return user data to redux store
        return response.data;
    } catch (error) {
        return error.message;
    }
});

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    try {
        const response = await axios.get(base_URL);
        return response.data;
    } catch (error) {
        return error.message;
    }
});
