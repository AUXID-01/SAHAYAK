import express from "express";
import { registerAsha, getAshaProfile } from "../controllers/asha.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register new ASHA worker
router.post("/register", registerAsha);

// Get ASHA worker profile (protected)
router.get("/profile", protect, getAshaProfile);

export default router;
