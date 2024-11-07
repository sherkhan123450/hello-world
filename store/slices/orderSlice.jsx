import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ order, profile }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/orders", { order, profile });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get orders for a specific user
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/orders/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      // Use dynamic route with userId and orderId in the path
      const response = await axios.put(`/api/orders/${userId}/${orderId}`, {
        isCanceled: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearUserOrderList = createAsyncThunk(
  "order/cancelOrder",
  async (userId, { rejectWithValue }) => {
    try {
      // Use dynamic route with userId and orderId in the path
      const response = await axios.delete(`/api/orders/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const clearOrderList = createAsyncThunk(
  "order/cancelOrder",
  async (_, { rejectWithValue }) => {
    try {
      // Use dynamic route with userId and orderId in the path
      const response = await axios.delete(`/api/orders`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    orders: [],
    getOrderStatus: null,
    removeOrderStatus: null,
    addOrderStatus: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle addOrder async actions
      .addCase(addOrder.pending, (state) => {
        state.addOrderStatus = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.addOrderStatus = "succeeded";
        state.order.push(action.payload.order);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.addOrderStatus = "failed";
        state.error = action.payload;
      })
      // Handle getOrders async actions
      .addCase(getOrders.pending, (state) => {
        state.getOrderStatus = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrderStatus = "succeeded";
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.getOrderStatus = "failed";
        state.error = action.payload;
      })
      // Handle cancelOrder async actions
      .addCase(cancelOrder.pending, (state) => {
        state.removeOrderStatus = "loading";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.removeOrderStatus = "succeeded";
        // Optionally filter out the canceled order from the state
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload.orderId
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.removeOrderStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
