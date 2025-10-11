import authRoutes from "./routes/auth.routes.js";
import phcRoutes from "./routes/phc.routes.js";
import ashaRoutes from "./routes/asha.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/auth", authRoutes);
app.use("/phc", phcRoutes);
app.use("/asha", ashaRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});