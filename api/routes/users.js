import express from "express";
import { getUser, updateUser } from "../controllers/user.js";
import { getAllUsers } from "../controllers/get_user.js";

const router = express.Router();

router.get("/find/:user_id", getUser);
router.put("/edit/:id", updateUser);
router.get("/findall", getAllUsers);

export default router;
