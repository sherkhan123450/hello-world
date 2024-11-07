import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  searchTerm: "",
  category: "",
  sortOrder: "",
  items: [],
  filteredItems: [],
  randomItems: [],
  mostLikedItems: [],
  specialOffer: [],
  weeklyOffers: [],
  singleFoodItem: {},
  view: "grid",
  fetchStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  singleDataStatus: "idle",
  error: null,
};
export const getSingleFoodItem = createAsyncThunk(
  "foodItems/getSingle",
  async (id) => {
    const response = await axios.get(
      `/api/admin/foodItems/getSetFoodItem/${id}`
    );
    return response.data.foodItem;
  }
);
// Async thunks
export const fetchAllFoodItems = createAsyncThunk(
  "foodItem/fetchAllFoodItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/foodItems/getSetFoodItem");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFoodItem = createAsyncThunk(
  "foodItem/createFoodItem",
  async (foodItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/admin/foodItems/getSetFoodItem",
        foodItem
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  "foodItem/updateItem",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/admin/foodItems/getSetFoodItem/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFoodItem = createAsyncThunk(
  "foodItem/deleteOffer",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/foodItems/getSetFoodItem/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const foodItemSlice = createSlice({
  name: "foodItem",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    filterItems(state) {
      if (state.items.length < 1) return;

      let filtered = state.items;

      if (state.searchTerm) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.category) {
        filtered = filtered.filter((item) => {
          return item.category.trim() === state.category.trim();
        });
      }

      if (state.sortOrder) {
        if (state.sortOrder === "price-asc") {
          filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (state.sortOrder === "price-desc") {
          filtered = filtered.sort((a, b) => b.price - a.price);
        } else if (state.sortOrder === "a-z") {
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (state.sortOrder === "z-a") {
          filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        }
      }

      state.filteredItems = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Food Items
      .addCase(fetchAllFoodItems.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllFoodItems.fulfilled, (state, action) => {
        state.filteredItems = action.payload;

        let wOffers = action.payload.filter((item) => item.ifWeeklyOffer) || [];
        wOffers.sort((a, b) => b.discountPercentage - a.discountPercentage);

        state.weeklyOffers = wOffers.slice(0, 4);

        const specialOffer =
          action.payload.find((item) => item.isSpecialOffer) || {};
        state.specialOffer = specialOffer;

        state.items = action.payload;

        state.fetchStatus = "succeeded";
      })

      .addCase(fetchAllFoodItems.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload.message;
      })

      // Create Food Item
      .addCase(createFoodItem.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createFoodItem.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createFoodItem.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload.message;
      })

      // Update Food Item
      .addCase(updateItem.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload.message;
      })

      // Delete Food Item
      .addCase(deleteFoodItem.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteFoodItem.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteFoodItem.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload.message;
      })
      .addCase(getSingleFoodItem.pending, (state) => {
        state.singleDataStatus = "loading";
      })
      .addCase(getSingleFoodItem.fulfilled, (state, action) => {
        state.singleDataStatus = "succeeded";
        state.singleFoodItem = action.payload;
      })
      .addCase(getSingleFoodItem.rejected, (state, action) => {
        state.singleDataStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setCategory,
  setSortOrder,
  setView,
  filterItems,
  getRandomItems,
  getMostLikedItems,
  getSpecialOffer,
  getWeeklyOffers,
} = foodItemSlice.actions;

export default foodItemSlice.reducer;
