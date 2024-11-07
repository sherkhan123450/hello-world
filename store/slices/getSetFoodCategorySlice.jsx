import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("/api/admin/foodItems/getSetCategory");
    return response.data;
  }
);

// Async thunk to create a new category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (name, { dispatch }) => {
    const response = await axios.post("/api/admin/foodItems/getSetCategory", {
      name,
    });
    dispatch(fetchCategories()); // Fetch updated categories after creation
    return response.data;
  }
);

// Async thunk to update an existing category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, name }, { dispatch }) => {
    const response = await axios.put(
      `/api/admin/foodItems/getSetCategory/${id}`,
      { name }
    );
    dispatch(fetchCategories()); // Fetch updated categories after update
    return response.data;
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `/api/admin/foodItems/getSetCategory/${id}`
    );
    dispatch(fetchCategories()); // Fetch updated categories after deletion
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
