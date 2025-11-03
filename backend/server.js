import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import registerRoutes from "./src/routes/register.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import phcRoutes from "./src/routes/phc.routes.js";
import ashaRoutes from "./src/routes/asha.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Database connection
mongoose.connect(process.env.MONGO_URL, {}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/auth", authRoutes);
app.use("/register", registerRoutes);
app.use("/phc", phcRoutes);
app.use("/asha", ashaRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


