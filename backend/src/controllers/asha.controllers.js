import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import AshaWorker from "../models/asha.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const registerAsha = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    date_of_birth,
    gender,
    photo_url,
    address,
    training_completed,
    certifications,
    associated_phc,
    bank_details,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !date_of_birth ||
    !gender ||
    !associated_phc
  ) {
    return res.status(400).json({ message: "Required fields missing" });
  }

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
    user_type: "asha_worker",
    is_active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create ASHA worker record
  const asha = await AshaWorker.create({
    user_id: user.user_id,
    date_of_birth,
    gender,
    photo_url,
    address,
    training_completed: training_completed || [],
    certifications: certifications || [],
    associated_phc,
    bank_details,
    verification_status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const payload = { id: user.user_id, role: user.user_type };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res
    .status(201)
    .json({ message: "ASHA worker registered successfully", token, user, asha });
});

export const getAshaProfile = asyncHandler(async (req, res) => {
  const asha = await AshaWorker.findOne({ user_id: req.user.id }).populate(
    "user_id",
    "-password_hash"
  );
  if (!asha) return res.status(404).json({ message: "ASHA worker not found" });
  res.json(asha);
});
