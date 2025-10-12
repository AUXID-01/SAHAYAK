import express from "express";
import { getPhcProfile } from "../controllers/phc.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get PHC staff profile (protected)
router.get("/profile", protect, getPhcProfile);

export default router;
