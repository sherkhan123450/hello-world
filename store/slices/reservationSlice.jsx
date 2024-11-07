import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveReservation = createAsyncThunk(
  "reservation/saveReservation",
  async ({ userId, reservationData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/reservation/${userId}`,
        reservationData
      );
      return response.data; // Ensure the response data structure matches your expectations
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getReservations = createAsyncThunk(
  "reservation/getReservations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/reservation`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getUserReservations = createAsyncThunk(
  "reservation/getUserReservations",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/reservation/${userId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteReservation = createAsyncThunk(
  "reservation/deleteReservation",
  async ({ userId, reservationId }, { rejectWithValue }) => {
    try {
      // Sending a DELETE request with a JSON body
      const response = await axios.delete(
        `/api/reservation/${userId}/${reservationId}`
      );
      return reservationId; // Return the reservation ID to remove it from the state
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

export const cencleReservation = createAsyncThunk(
  "reservation/deleteReservation",
  async ({ userId, reservationId }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/reservation/${userId}/${reservationId}`);
      return reservationId; // Return the reservation ID to remove it from the state
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState = {
  reservations: [],
  allReservations: [],
  getReservationsStatus: "idle",
  getAllReservationsStatus: "idle",
  getUserReservationsStatus: "idle",
  deleteReservationStatus: "idle",
  cencleReservationStatus: "idle",
  saveReservationStatus: "idle",
  error: null,
};

// Slice
const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservations(state, action) {
      state.reservations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Reservation
      .addCase(saveReservation.pending, (state) => {
        state.saveReservationStatus = "loading"; // Set loading state
      })
      .addCase(saveReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
        state.saveReservationStatus = "succeeded"; // Update the status
      })
      .addCase(saveReservation.rejected, (state, action) => {
        state.error = action.payload;
        state.saveReservationStatus = "failed"; // Update the status
      })
      // Get Reservations
      .addCase(getReservations.pending, (state) => {
        state.getAllReservationsStatus = "loading"; // Set loading state
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.allReservations = action.payload;
        state.getAllReservationsStatus = "succeeded"; // Update the status
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.error = action.payload;
        state.getAllReservationsStatus = "failed"; // Update the status
      })
      // Get User Reservations
      .addCase(getUserReservations.pending, (state) => {
        state.getUserReservationsStatus = "loading"; // Set loading state
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.getUserReservationsStatus = "succeeded"; // Update the status
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.error = action.payload;
        state.getUserReservationsStatus = "failed"; // Update the status
      })
      // Delete Reservation
      .addCase(deleteReservation.pending, (state) => {
        state.deleteReservationStatus = "loading"; // Set loading state
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(
          (reservation) => reservation._id !== action.payload
        );
        state.allReservations = state.allReservations.filter(
          (reservation) => reservation._id !== action.payload
        );
        state.deleteReservationStatus = "succeeded";
      })

      .addCase(deleteReservation.rejected, (state, action) => {
        state.error = action.payload;
        state.deleteReservationStatus = "failed"; // Update the status
      });
  },
});

// Export Actions
export const { setReservations } = reservationSlice.actions;

// Export Reducer
export default reservationSlice.reducer;
