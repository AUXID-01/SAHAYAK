import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// POST /register
export const registerBaseUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password, phone_number, user_type } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !password || !phone_number || !user_type) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  // Validate user_type
  const validTypes = ["asha_worker", "phc_staff", "admin"];
  if (!validTypes.includes(user_type)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  // Check if email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    user_id: crypto.randomUUID(),
    first_name,
    last_name,
    email,
    password_hash: hashedPassword,
    phone_number,
    user_type,
    is_active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(201).json({
    message: "Base user registered successfully",
    user_id: user.user_id,
    user_type: user.user_type,
  });
});
