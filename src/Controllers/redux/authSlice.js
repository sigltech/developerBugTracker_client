import { createSlice } from '@reduxjs/toolkit'
import { authLogin, getAllUsers } from '../authController.js'

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        admin: null || window.localStorage.getItem('BT_role'),
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
                state.userData = user;
                state.loggedIn = true;
                if (user.data.role === 'admin') {
                    state.admin = true;
                } else {
                    state.admin = false;
                }
            })
            .addCase(authLogin.rejected, (state, action) => {
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

