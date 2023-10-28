import express from "express";
import { getPost , addPost , updatePost , deletePost , getTopics ,getTopic} from "../controllers/post.js";

const router = express.Router()

router.get("/tops", getTopics);
router.get("/topic/:id", getTopic);
router.get("/", getPost);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router