import express from "express";
import { addComment , getComment ,getCanComment,
    updateComment,deleteComment,toggleLikeComment

} from "../controllers/comment.js";

const router = express.Router()
//get comment by id
router.get("/:dbt_id",getComment)
//add comment by stance 0 or 1
router.post("/",addComment)
//check comment can edit
router.get("/checkedit/:dbc_id",getCanComment)
//put comment edit
router.put("/edit/:dbc_id",updateComment)
//delete comment 
router.delete("/:dbc_id",deleteComment)
//comment likes
router.post("/like/:dbc_id",toggleLikeComment)
export default router;