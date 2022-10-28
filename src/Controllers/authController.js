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
        if (response.data.token) {
            window.localStorage.setItem('BT_token', response.data.token);
            window.localStorage.setItem('BT_name', response.data.data.name);
            window.localStorage.setItem('BT_role', response.data.data.role);
            window.localStorage.setItem('BT_user', JSON.stringify(response.data));
        }


        // return user data to redux store
        return response.data;
    } catch (error) {
        return error.message;
    }
});

export const authRegister = createAsyncThunk('user/authRegister', async (user) => {
    let randomPassword = Math.random().toString(36).substr(2, 8);
    user.password = randomPassword;
    try {
        const response = await axios.post(base_URL + "/register", user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
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

export const checkPassword = createAsyncThunk('user/checkPassword', async (user) => {
    try {
        const response = await axios.post(base_URL + "/checkPassword", user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async (user) => {
    try {
        const response = await axios.put(base_URL + "/modify", user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
});
