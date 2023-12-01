import express from "express";
import { getAllUsers , getActivity, getApprove, getProblem,  updateStatus, downloadRequest, getApprovefromdr_id, postActivity, reportupdateStatus, admindescription, postApproval, approvalStatus, getdbtdataforEditactivity} from "../controllers/admin.js";


const router = express.Router();

router.get("/findall", getAllUsers)
router.get("/apvdownload", getApprove)
router.get("/apvdownload/:dr_id", getApprovefromdr_id)
router.get("/activity", getActivity)
router.get("/reportproblem" ,getProblem)
router.put("/updatestatus",updateStatus)
router.put("/handlerequest",downloadRequest)
router.post("/postactivity",postActivity)
router.put("/reportproblem_status", reportupdateStatus);
router.put("/rereportproblem_admindescription",admindescription)
router.post("/adminapvdownload",postApproval)
router.put("/approval_status",approvalStatus)
router.get("/activity_get_for_edit/:dbt_id",getdbtdataforEditactivity)



export default router;