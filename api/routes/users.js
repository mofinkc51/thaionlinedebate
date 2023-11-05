import express from "express";
import { getUser, updateUser } from "../controllers/user.js";

const router = express.Router();
router.get("/find/:user_id", getUser);
router.put("/edit/:id", updateUser);

export default router;
