import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch the user's profile based on email
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (email, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/profiles/${email}`);
            if (!response.ok) {
                const errorData = await response.json();
                
                return rejectWithValue(errorData.error || 'Failed to fetch profile');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to update the user's profile
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (updatedProfile, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/profiles/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.error || 'Failed to update profile');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle pending state for fetchProfile
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            // Handle fulfilled state for fetchProfile
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            // Handle rejected state for fetchProfile
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle pending state for updateProfile
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
            })
            // Handle fulfilled state for updateProfile
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            // Handle rejected state for updateProfile
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;
