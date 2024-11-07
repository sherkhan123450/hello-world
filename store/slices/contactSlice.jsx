// slices/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to submit contact form data to the API
export const submitContactForm = createAsyncThunk(
    'contact/submitContactForm',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/contactForm', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        message : null ,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitContactForm.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default contactSlice.reducer;
