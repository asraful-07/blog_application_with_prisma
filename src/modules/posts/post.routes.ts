import express from "express";
import {
  CreatePostController,
  DeletePostController,
  GetPostController,
  GetsPostController,
  UpdatePostController,
} from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

// routes
router.post("/post", auth(UserRole.USER, UserRole.ADMIN), CreatePostController);
router.get("/posts", GetsPostController);
router.get("/post/:id", GetPostController);
router.put("/post/:id", UpdatePostController);
router.delete("/post/:id", DeletePostController);

export default router;
