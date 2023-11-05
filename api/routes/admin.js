import express from "express";
import { getAllUsers } from "../controllers/get_user.js";
import { getApprove } from "../controllers/get_apvDownload.js";

const router = express.Router();

router.get("/findall", getAllUsers);
router.get("/apvdownload", getApprove);

export default router;
