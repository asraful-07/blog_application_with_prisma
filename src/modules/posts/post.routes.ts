import express from "express";
import {
  CreatePostController,
  DeletePostController,
  GetPostController,
  GetsPostController,
  UpdatePostController,
} from "./post.controller";

const router = express.Router();

router.post("/post", CreatePostController);
router.get("/posts", GetsPostController);
router.get("/post/:id", GetPostController);
router.put("/post/:id", UpdatePostController);
router.delete("/post/:id", DeletePostController);

export default router;
