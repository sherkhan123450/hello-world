import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to handle errors
const handleErrors = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

// Thunk to fetch all previous orders
export const fetchAllPreviousOrders = createAsyncThunk(
  "previousOrders/fetchAllPrevious",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/orders/getPreviousOrders");
      return response.data.orders; // Assuming orders are in response.data.orders
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const fetchItemsByNames = createAsyncThunk(
  "previousOrders/fetchItemsByNames",
  async (namesArray, { rejectWithValue }) => {
    const names = namesArray.map((item) => item.name).join(",");

    try {
      const response = await axios.get(
        `/api/orders/getMostLikedItems?names=${encodeURIComponent(names)}`
      );
      return response.data.items; // Return the API response data
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const deletePreviousOrder = createAsyncThunk(
  "previousOrders/deletePrevious",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/orders/getPreviousOrders/${orderId}`
      );
      return response.data; // Assuming the response contains the deleted order ID
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// Thunk to delete all previous orders
export const deleteAllPreviousOrders = createAsyncThunk(
  "previousOrders/deleteAllPrevious",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/orders/getPreviousOrders");
      return response.data; // Assuming the response indicates success
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// Creating the previousOrders slice
const previousOrdersSlice = createSlice({
  name: "previousOrders",
  initialState: {
    OrdersAndQuantity: [],
    mostOrderedItems: [],
    mostOrderedItemsNames: [],
    previousOrders: [],
    previousOrdersLength: 0,
    allPreviousOrdersTotalIncome: 0,
    previousOrdersStatus: "idle",
    deleteStatus: "idle",
    deleteAllStatus: "idle",
    mostOrderedItemsError: null,
    mostOrderedItemsStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all previous orders
      .addCase(fetchAllPreviousOrders.pending, (state) => {
        state.previousOrdersStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAllPreviousOrders.fulfilled, (state, action) => {
        state.previousOrdersStatus = "succeeded";
        state.previousOrders = action.payload; // Assuming payload is an array of orders
        state.previousOrdersLength = action.payload.length;
        const total = action.payload.reduce(
          (sum, item) => sum + item.order.totalPrice,
          0
        );
        state.allPreviousOrdersTotalIncome = total;

        let allItems = [];
        action.payload.forEach((order) => {
          if (Array.isArray(order.order.items)) {
            order.order.items.forEach((item) => {
              allItems.push({ name: item.name, quantity: item.quantity });
            });
          }
        });

        const uniqueItemsMap = new Map();
        allItems.forEach((item) => {
          if (uniqueItemsMap.has(item.name)) {
            uniqueItemsMap.set(
              item.name,
              uniqueItemsMap.get(item.name) + item.quantity
            );
          } else {
            uniqueItemsMap.set(item.name, item.quantity);
          }
        });

        const uniqueItems = Array.from(uniqueItemsMap, ([name, quantity]) => ({
          name,
          quantity,
        })).sort((a, b) => b.quantity - a.quantity);

        state.OrdersAndQuantity = uniqueItems;
        state.mostOrderedItemsNames = uniqueItems.slice(0, 3); // Get the first three items
        state.error = null; // Reset error state
      })
      .addCase(fetchAllPreviousOrders.rejected, (state, action) => {
        state.previousOrdersStatus = "failed";
        state.error = action.payload;
      })

      .addCase(fetchItemsByNames.pending, (state) => {
        state.mostOrderedItemsStatus = "loading";
      })
      .addCase(fetchItemsByNames.fulfilled, (state, action) => {
        state.mostOrderedItemsStatus = "succeeded";
        state.mostOrderedItems = action.payload; // Update mostOrderedItems with the fetched data
      })
      .addCase(fetchItemsByNames.rejected, (state, action) => {
        state.mostOrderedItemsStatus = "failed";
        state.mostOrderedItemsError = action.payload;
      })

      // Delete a single previous order
      .addCase(deletePreviousOrder.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePreviousOrder.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        const deletedOrderId = action.payload._id; // Assuming the payload has the deleted order ID
        state.previousOrders = state.previousOrders.filter(
          (order) => order._id !== deletedOrderId
        );
      })
      .addCase(deletePreviousOrder.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAllPreviousOrders.pending, (state) => {
        state.deleteAllStatus = "loading";
      })
      .addCase(deleteAllPreviousOrders.fulfilled, (state) => {
        state.deleteAllStatus = "succeeded";
        state.previousOrders = [];
      })
      .addCase(deleteAllPreviousOrders.rejected, (state, action) => {
        state.deleteAllStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default previousOrdersSlice.reducer;
