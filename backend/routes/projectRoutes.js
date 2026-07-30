import express from "express";
import { analyzeProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/analyze", analyzeProject);

export default router;