import { createSlice } from '@reduxjs/toolkit'
import { authLogin, getAllUsers, authRegister } from '../authController.js'

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        AllUsers: [],
        userData: window.localStorage.getItem('BT_user') ? JSON.parse(window.localStorage.getItem('BT_user')) : [],
        admin: window.localStorage.getItem('BT_role') === 'admin' ? true : false,
        loggedIn: window.localStorage.getItem('BT_token') ? true : false,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.loggedIn = false;
            state.userData = [];
            state.admin = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const user = action.payload;
                if (user.token !== undefined) {
                    state.userData = user;
                    state.loggedIn = true;
                    if (user.data.role === 'admin' && user.data.role !== undefined) {
                        state.admin = true;
                    } else if (user.data.role === (undefined || null)) {
                        state.admin = false;
                    } else {
                        state.admin = false;
                    }
                } else {
                    state.error = user;
                }
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(authRegister.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(authRegister.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.AllUsers = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export const { login, logout } = authSlice.actions

export const authLoading = (state) => state.auth.status;
export const authError = (state) => state.auth.error;
export const authUser = (state) => state.auth.user;
export const authLoggedIn = (state) => state.auth.loggedIn;

export default authSlice.reducer

