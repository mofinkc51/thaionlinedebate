import express from "express";
import { addFavorite } from "../controllers/like.js";

const router = express.Router()

router.post("/fav",addFavorite)

export default router