import express from "express";
import { getPost , addPost , updatePost , deletePost , getTops ,getTopic,getFav} from "../controllers/post.js";

const router = express.Router()

router.get("/tops", getTops);
router.get("/topic/:dbt_id", getTopic);
router.get("/fav", getFav);
router.get("/", getPost);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router