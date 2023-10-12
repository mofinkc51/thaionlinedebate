import express from "express";
import { getUser , updateUser} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:",getUser)
router.put("/edit", updateUser)

export default router