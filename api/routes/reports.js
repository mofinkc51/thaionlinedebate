import express from "express";
import { addReport, getReport } from "../controllers/report.js";
const router = express.Router()

router.post("/", addReport)
router.get("/", getReport)

export default router