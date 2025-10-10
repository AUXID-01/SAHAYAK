import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["asha_worker", "phc_staff", "admin"],
      required: true,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;
