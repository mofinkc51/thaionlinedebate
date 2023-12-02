import express from "express";
import { getAllUsers , getActivity, getApprove, getProblem,  updateStatus, downloadRequest,
     getApprovefromdr_id, postActivity,
      reportupdateStatus, admindescription, 
      postApproval, approvalStatus, editActivity,deleteActivity
    
    } from "../controllers/admin.js";


const router = express.Router();

router.get("/findall", getAllUsers)

router.get("/apvdownload", getApprove)

router.get("/apvdownload/:dr_id", getApprovefromdr_id)

router.get("/activity", getActivity)

router.post("/postactivity",postActivity)

router.put("/editactivity",editActivity)

router.delete("/deleteactivity/:dbt_id",deleteActivity)

router.get("/reportproblem" ,getProblem)

router.put("/updatestatus",updateStatus)

router.put("/handlerequest",downloadRequest)

router.put("/reportproblem_status", reportupdateStatus);

router.put("/rereportproblem_admindescription",admindescription)

router.post("/adminapvdownload",postApproval)

router.put("/approval_status",approvalStatus)




export default router;