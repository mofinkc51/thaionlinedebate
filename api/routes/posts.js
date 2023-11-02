import express from "express";
import { addPost , updatePost , deletePost , getTops ,getTopic,getFav,checkTopicCanEdit,getLastTopic} from "../controllers/post.js";

const router = express.Router()
//get top 3 topic
router.get("/tops", getTops);
//gettopic by id
router.get("/topic/:dbt_id", getTopic);
//get fav topic by userid
router.get("/fav", getFav);
//add topic
router.post("/", addPost);
//edit topic 
router.put("/edit/:dbt_id", updatePost);
//check topic can edit
router.get("/checkedit/:dbt_id", checkTopicCanEdit);
//delete topic
router.delete("/:dbt_id", deletePost);
//get last topic create
router.get("/last",getLastTopic)
export default router