import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    roles,
    permissions,
    regions_managed,
  } = req.body;

  const validRoles = ["superadmin", "regionaladmin", "dataadmin"];
  const invalidRole = roles.some((r) => !validRoles.includes(r));
  if (invalidRole)
    return res.status(400).json({ message: "Invalid admin role provided" });

  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ message: "Required fields missing" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create base user
  const user = await User.create({
    user_id: crypto.randomUUID(),
    first_name,
    last_name,
    email,
    password_hash: hashedPassword,
    phone_number,
    user_type: "admin",
    is_active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create admin role record
  const admin = await Admin.create({
    user_id: user.user_id,
    roles,
    permissions,
    regions_managed,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const payload = { id: user.user_id, role: user.user_type };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res
    .status(201)
    .json({ message: "Admin registered successfully", token, user, admin });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ user_id: req.user.id }).populate(
    "user_id",
    "-password_hash"
  );
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
});
