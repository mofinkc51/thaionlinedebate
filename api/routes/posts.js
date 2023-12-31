import express from "express";
import { addPost , updatePost , deletePost , 
    getTops ,
    getTags,getTopicByTag,getAllTag,
    getTopic,getFav,checkTopicCanEdit,
    getLastTopic,getSearch,getTagByDebate,
    getDebateByUser,getActivityTopic
} from "../controllers/post.js";

const router = express.Router()
//get tops topic
router.get("/tops", getTops);
//gettopic by id
router.get("/topic/:dbt_id", getTopic);
//get fav topic by userid
router.get("/fav", getFav);
//get topic by user
router.get("/debate/:user_id", getDebateByUser)
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
//get top for search
router.get("/search",getSearch)
//getTag
router.get("/tags",getTags)
//getTagById
router.get("/tag/:tag_name",getTopicByTag)
//getalltag
router.get("/alltag",getAllTag)
//getTagByDebate
router.get("/tag/debate/:dbt_id",getTagByDebate)
//get activity
router.get("/activity",getActivityTopic)

export default router