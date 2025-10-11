import express from "express";
import { registerAdmin, getAdminProfile } from "../controllers/admin.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register new admin user
router.post("/register", registerAdmin);

// Get admin profile (protected)
router.get("/profile", protect, getAdminProfile);

export default router;
