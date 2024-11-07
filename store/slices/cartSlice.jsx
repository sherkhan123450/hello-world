import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cartitems/${userId}`);
      if (Array.isArray(response.data.items)) {
        return response.data.items;
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching cart items"
      );
    }
  }
);

// Thunk to add an item to the cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ userId, item }, { rejectWithValue }) => {
    console.log(userId, item);
    try {
      const response = await axios.post(`/api/cartitems/${userId}/items`, item);
      return response.data; // Adjust based on actual response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding item to cart"
      );
    }
  }
);

// Thunk to remove an item from the cart
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/cartitems/${userId}/items/${itemId}`);
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error removing item from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize as an array
    deliveryFees: 50, // State for delivery fees
    totalItemsPrice: 0, // State for total cart items price (quantity * price)
    fetchStatus: "idle",
    createStatus: "idle",
    removeStatus: "idle",
    createError: null,
    error: null,
  },
  reducers: {
    setTotalItemsPrice: (state, action) => {
      state.totalItemsPrice = action.payload;
    },
    updateQuantityLocally: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const item = state.items.find((item) => item._id === itemId);
      if (item) {
        item.quantity = newQuantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = [...action.payload]; // Avoid mutation
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.createStatus = "loading";
        toast.info("Adding item to cart...");
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items = [...state.items, action.payload]; // Avoid mutation
        toast.success("Item added to cart successfully.");
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
        toast.error(`Failed to add item to cart: ${action.payload}`);
      })

      // Remove Item from Cart
      .addCase(removeItem.pending, (state) => {
        state.removeStatus = "loading";
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.removeStatus = "succeeded";
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.removeStatus = "failed";
        state.error = action.payload;
      });
  },
});

// Export the reducers and actions
export const { setTotalItemsPrice, updateQuantityLocally } = cartSlice.actions;

export default cartSlice.reducer;
