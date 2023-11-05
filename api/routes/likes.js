import express from "express";
import { addFavorite , checkFav } from "../controllers/like.js";

const router = express.Router()

router.post("/fav",addFavorite)
router.get("/checkfav",checkFav)
export default router