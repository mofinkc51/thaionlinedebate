import express from "express";
import { getDownload,addDownload,deleteDownload,updatePending,getDownloadPending } from "../controllers/download.js";

const router = express.Router()

router.get("/", getDownload)
router.post("/", addDownload)
router.delete("/:dbt_id", deleteDownload)
router.put("/", updatePending)
router.get("/pending", getDownloadPending)

export default router