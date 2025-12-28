import express from "express";
import { CreatePostController } from "./post.controller";

const router = express.Router();

router.post("/post", CreatePostController);

export default router;
