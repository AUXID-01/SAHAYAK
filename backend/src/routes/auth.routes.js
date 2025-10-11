import express from "express";
import { login } from "../controllers/auth.controllers.js";

const router = express.Router();

// Login route (no authentication needed)
router.post("/login", login);

export default router;
