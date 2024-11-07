import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/getUsers"); // Update this to your users API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Toggle admin status
export const adminToggle = createAsyncThunk(
  "users/adminToggle",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/admin/getUsers/${userId}`);
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/getUsers/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    admins: 0,
    status: "idle",
    isVerified: 0,
    notVerified: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.admins = state.users.filter((user) => user.isAdmin).length;
        state.isVerified = state.users.filter((user) => user.isVerified).length;
        state.notVerified = state.users.filter(
          (user) => !user.isVerified
        ).length;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Admin toggle
      .addCase(adminToggle.fulfilled, (state, action) => {
        const { userId, data } = action.payload;
        const existingUser = state.users.find((user) => user._id === userId);
        if (existingUser) {
          existingUser.isAdmin = data.isAdmin;
        }
      })
      .addCase(adminToggle.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
