import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import PHCStaff from "../models/phc.model.js";

// Step 2: PHC role-specific registration
export const registerPhcDetails = asyncHandler(async (req, res) => {
  const {
    user_id,
    date_of_birth,
    gender,
    photo_url,
    address,
    training_completed,
    certifications,
    bank_details,
    permissions
  } = req.body;

  if (!user_id || !date_of_birth || !gender) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const user = await User.findOne({ user_id });
  if (!user) return res.status(404).json({ message: "Base user not found" });

  const existingPhc = await PHCStaff.findOne({ user_id });
  if (existingPhc) return res.status(400).json({ message: "PHC details already submitted" });

  const phc = await PHCStaff.create({
    user_id,
    date_of_birth,
    gender,
    photo_url,
    address: address || {},
    training_completed: training_completed || [],
    certifications: certifications || [],
    bank_details: bank_details || {},
    permissions: permissions || [],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  res.status(201).json({
    message: "PHC staff details registered successfully",
    phc
  });
});


// Get PHC profile (protected)
export const getPhcProfile = asyncHandler(async (req, res) => {
  const phc = await PHCStaff.findOne({ user_id: req.user.id }).populate(
    "user_id",
    "-password_hash"
  );
  if (!phc) return res.status(404).json({ message: "PHC staff not found" });
  res.json(phc);
});

