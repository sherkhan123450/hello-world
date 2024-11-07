import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Helper function to get token from local storage on the client side only
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null; // Return null during SSR
};

// Thunk to handle sign-up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to sign up");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to handle login
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to log in");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to check if the user is logged in
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    try {
      const response = await fetch("/api/auth/checkAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to verify authentication");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {},
  token: null,
  status: "idle",
  checkAuthStatus: "idle",
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      toast.info("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign-Up
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.checkAuthStatus = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkAuthStatus = "succeeded";
        state.user = action.payload.decoded;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.checkAuthStatus = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
