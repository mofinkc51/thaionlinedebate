import express from "express";
import { getDownload,addDownload,getDownloadApproved } from "../controllers/download.js";

const router = express.Router()

router.get("/", getDownload)
router.post("/", addDownload)
router.get("/approved", getDownloadApproved)

export default router