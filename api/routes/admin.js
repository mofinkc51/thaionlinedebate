import express from "express";
import { getAllUsers , getActivity, getDownloadRequest, getProblem,  updateStatus, downloadRequest,
      getApproval, postActivity,
      reportupdateStatus, admindescription, 
      postApproval, editActivity,deleteActivity,postRejected,
      checkTimeOverlap
    } from "../controllers/admin.js";


const router = express.Router();

router.get("/findall", getAllUsers)

router.get("/downloadrequest", getDownloadRequest)

router.get("/getApproval", getApproval)

router.post("/checktimeactivity",checkTimeOverlap)

router.get("/activity", getActivity)

router.post("/postactivity",postActivity)

router.put("/editactivity",editActivity)

router.post("/rejectedactivity",postRejected)

router.delete("/deleteactivity/:dbt_id",deleteActivity)

router.get("/reportproblem" ,getProblem)

router.put("/reportproblem_status", reportupdateStatus);

router.put("/rereportproblem_admindescription",admindescription)

router.put("/updatestatus",updateStatus)

router.put("/handlerequest",downloadRequest)

router.post("/adminapvdownload",postApproval)





export default router;