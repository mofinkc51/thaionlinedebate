import express from "express";
import { getDownload,addDownload,deleteDownload } from "../controllers/download.js";

const router = express.Router()

router.get("/", getDownload)
router.post("/", addDownload)
router.delete("/:dbt_id", deleteDownload)

export default router