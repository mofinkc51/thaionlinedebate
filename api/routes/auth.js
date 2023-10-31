import express from "express";
import { login,register,logout,checktoken } from "../controllers/auth_c.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout",logout)
router.get("/token",checktoken)

export default router