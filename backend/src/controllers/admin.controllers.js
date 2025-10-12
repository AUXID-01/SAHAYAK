import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

// Step 2: Admin role-specific registration
export const registerAdminDetails = asyncHandler(async (req, res) => {
  const { user_id, roles, permissions, regions_managed } = req.body;

  if (!user_id || !roles || roles.length === 0) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const user = await User.findOne({ user_id });
  if (!user) return res.status(404).json({ message: "Base user not found" });

  const existingAdmin = await Admin.findOne({ user_id });
  if (existingAdmin) return res.status(400).json({ message: "Admin details already submitted" });

  const validRoles = ["superadmin", "regionaladmin", "dataadmin"];
  const invalidRole = roles.some((r) => !validRoles.includes(r));
  if (invalidRole) return res.status(400).json({ message: "Invalid admin role provided" });

  const admin = await Admin.create({
    user_id,
    roles,
    permissions: permissions || [],
    regions_managed: regions_managed || [],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  res.status(201).json({
    message: "Admin details registered successfully",
    admin
  });
});


// Get Admin profile (protected)
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ user_id: req.user.id }).populate(
    "user_id",
    "-password_hash"
  );
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
});