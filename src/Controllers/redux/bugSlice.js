import { createSlice } from '@reduxjs/toolkit';
import { fetchBugs, addBug } from '../bugController.js';


export const bugSlice = createSlice({
    name: "bug",
    initialState:
    {
        bugsData: [],
        isLoading: false,
        status: "idle", // idle, loading, succeeded, failed
        error: null, // null, error message
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBugs.pending, (state, action) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(fetchBugs.fulfilled, (state, action) => {
                state.status = "succeeded";
                const loadedBugs = action.payload;
                state.bugsData = loadedBugs;
                state.isLoading = false;
            })
            .addCase(fetchBugs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addBug.pending, (state, action) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(addBug.fulfilled, (state, action) => {
                state.status = "succeeded";
                const newBug = action.payload;
                state.bugsData.concat(newBug);
                state.isLoading = false;
            })
            .addCase(addBug.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.isLoading = false;
            })
    }
})

export const { getBugs } = bugSlice.actions
export const selectAllBugs = (state) => state.bugs.bugsData;
export const getBugsStatus = (state) => state.bugs.status;
export const getBugsError = (state) => state.bugs.error;
export const getBugsLoading = (state) => state.bugs.isLoading;

export default bugSlice.reducer
