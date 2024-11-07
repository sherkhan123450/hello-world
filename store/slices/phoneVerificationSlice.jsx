import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendVerificationCode = createAsyncThunk(
    'phoneVerification/sendVerificationCode',
    async (phoneNumber, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/send-code', { phoneNumber });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'phoneVerification/verifyOtp',
    async ({ phoneNumber, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/verify-opt', { phoneNumber, otp });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const phoneVerificationSlice = createSlice({
    name: 'phoneVerification',
    initialState: {
        isVerified: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendVerificationCode.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(sendVerificationCode.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.isVerified = true;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default phoneVerificationSlice.reducer;
