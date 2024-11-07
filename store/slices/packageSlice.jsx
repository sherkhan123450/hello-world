// src/redux/packageSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a package
export const createPackage = createAsyncThunk(
  "package/createPackage",
  async (packageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/admin/foodItems/getSetPackage/",
        packageData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching all packages
export const fetchPackages = createAsyncThunk(
  "package/fetchPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/foodItems/getSetPackage");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for editing a package
export const editPackage = createAsyncThunk(
  "package/editPackage",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/admin/foodItems/getSetPackage/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a package
export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/admin/foodItems/getSetPackage/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const packageSlice = createSlice({
  name: "package",
  initialState: {
    createStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle",
    fetchStatus: "idle",
    packages: [],
    error: null,
    createError: null,
    deleteError: null,
    editError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create Package
    builder
      .addCase(createPackage.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createPackage.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      });

    // Fetch Packages
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });

    // Edit Package
    builder
      .addCase(editPackage.pending, (state) => {
        state.editStatus = "loading";
        state.editError = null;
      })
      .addCase(editPackage.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        const index = state.packages.findIndex(
          (pkg) => pkg._id === action.payload._id
        );
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(editPackage.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.payload;
      });

    // Delete Package
    builder
      .addCase(deletePackage.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.packages = state.packages.filter(
          (pkg) => pkg._id !== action.meta.arg
        );
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

export default packageSlice.reducer;
