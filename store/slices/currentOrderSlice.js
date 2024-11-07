import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to handle errors
const handleErrors = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const fetchAllCurrentOrders = createAsyncThunk(
  "currentOrders/fetchAllCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/orders");
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);



export const deleteOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    console.log("Deleting Order:", { userId, orderId });
    try {
      const response = await axios.delete(`/api/orders/${userId}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      return rejectWithValue(error.response?.data || { error: 'An error occurred' });
    }
  }
);


export const updateOrderStatus = createAsyncThunk(
  "currentOrders/updateStatus",
  async ({ userId, orderId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/orders/${userId}/${orderId}`, {
        newStatus,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

// Thunk to complete an order
export const completeOrder = createAsyncThunk(
  "currentOrders/completeOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    console.log(userId, orderId)
    try {
      const response = await axios.post(`/api/orders/${userId}/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

const currentOrdersSlice = createSlice({
  name: "currentOrders",
  initialState: {
    currentOrders: [],
    activeCurrentOrders: [],
    pendingCurrentOrders: [],
    currentOrdersStatus: "idle",
    statusUpdateStatus: "idle",
    deletedOrderStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all current orders
      .addCase(fetchAllCurrentOrders.pending, (state) => {
        state.error = null;
        state.currentOrdersStatus = "loading";
      })
      .addCase(fetchAllCurrentOrders.fulfilled, (state, action) => {
        state.currentOrders = action.payload;

        let aItems = [];
        let pItems = [];

        action.payload.forEach((order) => {
          order.orders.forEach((orderItem) => {
            // Check the status and categorize orders
            if (orderItem.status === "Active") {
              aItems.push(orderItem);
            } else if (orderItem.status === "Pending") {
              pItems.push(orderItem);
            }
          });
        });

        state.activeCurrentOrders = aItems;
        state.pendingCurrentOrders = pItems;
        state.currentOrdersStatus = "succeeded";
      })
      .addCase(fetchAllCurrentOrders.rejected, (state, action) => {
        state.currentOrdersStatus = "failed";
        state.error = action.payload;
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.statusUpdateStatus = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.statusUpdateStatus = "succeeded";
        const updatedOrder = action.payload;
        const orderIndex = state.currentOrders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex >= 0) {
          state.currentOrders[orderIndex] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.statusUpdateStatus = "failed";
        state.error = action.payload;
      })

      // Complete order
      .addCase(completeOrder.pending, (state) => {
        state.statusUpdateStatus = "loading";
      })
      .addCase(completeOrder.fulfilled, (state, action) => {
        state.statusUpdateStatus = "succeeded";
        const completedOrder = action.payload;
        const orderIndex = state.currentOrders.findIndex(
          (order) => order._id === completedOrder._id
        );
        if (orderIndex >= 0) {
          state.currentOrders[orderIndex] = completedOrder;
        }
      })
      .addCase(completeOrder.rejected, (state, action) => {
        state.statusUpdateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.deletedOrderStatus = "succeeded";

      })

  },
});

export default currentOrdersSlice.reducer;
