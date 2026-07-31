import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "TeamForge AI Backend Running",
        version: "1.0.0"
    });
});

app.use("/api/project", projectRoutes);
app.use("/api/freelancer", freelancerRoutes);

// Catch-all for unmatched API routes — always JSON, never Express's HTML 404 page
app.use("/api", (req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});