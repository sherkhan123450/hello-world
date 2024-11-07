import mongoose from "mongoose";

const userIdFRSchema = new mongoose.Schema({
  userIdFR: {
    type: String, // Change to String if user IDs are strings
    required: true,
  },
  code: {
    type: String,
    default: "hello",
    required: true,
  },
});

const userIdFR =
  mongoose.models.userIdFR || mongoose.model("userIdFR", userIdFRSchema);

export default userIdFR;
