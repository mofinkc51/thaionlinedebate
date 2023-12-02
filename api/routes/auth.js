import express from "express";
import { login,register,logout,checktoken,
    changePassword,resetPassword,forgotPassword,
    adminChecked
} from "../controllers/auth_c.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout",logout)
router.get("/token",checktoken)
router.put("/changepassword",changePassword)
router.post("/reset-password",forgotPassword)
router.post("/reset-password/:resetToken", resetPassword);
router.get("/admin-checked",adminChecked)
export default router