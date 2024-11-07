import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 'dashboard', // Default page
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setPage } = adminSlice.actions;
export default adminSlice.reducer;
