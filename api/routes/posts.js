import express from "express";
import { getPost , addPost , updatePost , deletePost , getTops ,getTopic,getFav,checkTopicCanEdit} from "../controllers/post.js";

const router = express.Router()

router.get("/tops", getTops);
router.get("/topic/:dbt_id", getTopic);
router.get("/fav", getFav);
router.get("/", getPost);
router.post("/", addPost);
router.put("/edit/:dbt_id", updatePost);
router.get("/checkedit/:dbt_id", checkTopicCanEdit);
router.delete("/:id", deletePost);

export default router