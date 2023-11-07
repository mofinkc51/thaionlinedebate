import express from "express";
import { getUser, updateUser } from "../controllers/user.js";
import { getUser , updateUser ,getUserCount,getUserHistory} from "../controllers/user.js";

const router = express.Router();

router.get("/find/:user_id",getUser)
router.put("/edit/:user_id", updateUser)
router.get("/count/:user_id",getUserCount)
router.get("/history/:user_id",getUserHistory)

export default router
