import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Controllers/redux/authSlice'
import bugReducer from '../Controllers/redux/bugSlice'

export const store = configureStore({
    reducer: {
        user: authReducer,
        bugs: bugReducer
    },
})
