import express from "express";
import { getDownload,addDownload,deleteDownload } from "../controllers/download.js";

const router = express.Router()

router.get("/download", getDownload)
router.post("/download", addDownload)
router.delete("/download", deleteDownload)

export default router