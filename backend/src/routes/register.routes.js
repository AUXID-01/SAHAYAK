import express from "express";
import { registerBaseUser } from "../controllers/register.controllers.js";
import { registerAshaDetails } from "../controllers/asha.controllers.js";
import { registerPhcDetails } from "../controllers/phc.controllers.js";
import { registerAdminDetails } from "../controllers/admin.controllers.js";

const router = express.Router();

// Step 1: Base user registration
router.post("/", registerBaseUser);

// Step 2: Role-specific registration
router.post("/asha", registerAshaDetails);
router.post("/phc", registerPhcDetails);
router.post("/admin", registerAdminDetails);

export default router;
