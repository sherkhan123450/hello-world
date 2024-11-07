// slices/aboutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSection: 'restaurant', // Default section
};

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setActiveSection(state, action) {
            state.activeSection = action.payload;
        },
    },
});

export const { setActiveSection } = aboutSlice.actions;
export default aboutSlice.reducer;
