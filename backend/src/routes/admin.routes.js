import express from "express";
import { getAdminProfile } from "../controllers/admin.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get admin profile (protected)
router.get("/profile", protect, getAdminProfile);

export default router;
