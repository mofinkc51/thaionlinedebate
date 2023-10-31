import express from "express";
import { addComment , getComment } from "../controllers/comment.js";

const router = express.Router()

router.get("/:dbt_id",getComment)
router.post("/",addComment)


export default router;