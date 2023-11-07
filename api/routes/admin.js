import express from "express";
import { getAllUsers } from "../controllers/get_user.js";
import { getApprove } from "../controllers/get_apvDownload.js";
import { getActivity } from "../controllers/get_activity.js";

const router = express.Router();

router.get("/findall", getAllUsers);
router.get("/apvdownload", getApprove);
router.get("/activity", getActivity)

export default router;
