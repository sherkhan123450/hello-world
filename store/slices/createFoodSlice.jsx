// src/redux/foodItemSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    category: '',
    description: '',
    price: '',
    image: null,
};

const foodItemSlice = createSlice({
    name: 'foodItem',
    initialState,
    reducers: {
        setFoodItem: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearFoodItem: () => initialState,
    },
});

export const { setFoodItem, clearFoodItem } = foodItemSlice.actions;

export default foodItemSlice.reducer;
