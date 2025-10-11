import express from "express";
import { registerPhcStaff, getPhcProfile } from "../controllers/phc.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register new PHC staff
router.post("/register", registerPhcStaff);

// Get PHC staff profile (protected)
router.get("/profile", protect, getPhcProfile);

export default router;
