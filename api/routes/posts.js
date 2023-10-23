import express from "express";
import { getPost , addPost , updatePost , deletePost } from "../controllers/post.js";

const router = express.Router()

router.get("/", getPost);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router