import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login handler (works for all roles)
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Invalid Password" });

  const payload = { id: user.user_id, role: user.user_type };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    message: "Login successful",
    token,
    role: user.user_type,
    user: {
      id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.user_type,
    },
  });
});
