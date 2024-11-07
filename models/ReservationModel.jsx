// models/Reservation.js

import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Ensure this is the correct type
      ref: "User", // Assuming you have a User model
      required: true, // Make it required if necessary
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
    partyDate: {
      type: Date,
      required: true,
    },
    partyTime: {
      type: String,
      required: true,
    },
    partyType: {
      type: String,
      required: true,
    },
    selectedPackages: {
      type: String,
      required: true,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    foodPackages: {
      type: [String], // Array of food packages
      default: [], // Default to an empty array if not provided
    },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);
