import express from "express";
import { getAshaProfile } from "../controllers/asha.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get ASHA worker profile (protected)
router.get("/profile", protect, getAshaProfile);

export default router;
