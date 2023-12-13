import express from "express";
import { getDownload,addDownload,deleteDownload,updatePending,
    getDownloadPending,getDownloadDetail,getDownloadDetailDebate,
    getDownloadApproved,getDownloadAdmin,getDownloadRequestById
} from "../controllers/download.js";

const router = express.Router()

router.get("/", getDownload)
router.get("/admin", getDownloadAdmin)
router.post("/", addDownload)
router.delete("/:dbt_id", deleteDownload)
router.put("/", updatePending)
router.get("/pending", getDownloadPending)
router.get("/approved", getDownloadApproved)
router.get("/detail/:dr_id", getDownloadDetail)
router.get("/detail/debate/:dr_id", getDownloadDetailDebate)
router.get("/request/:dr_id", getDownloadRequestById)
export default router