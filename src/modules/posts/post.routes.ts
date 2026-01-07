import express from "express";
import {
  CreatePostController,
  DeletePostController,
  GetPostController,
  GetsPostController,
  MyPostController,
  StatsController,
  UpdatePostController,
} from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post("/post", auth(UserRole.USER, UserRole.ADMIN), CreatePostController);
router.get("/posts", GetsPostController);
router.get("/post/:id", GetPostController);
router.get("/my-post", auth(UserRole.USER, UserRole.ADMIN), MyPostController);
router.put(
  "/post/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  UpdatePostController
);
router.delete(
  "/post/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  DeletePostController
);
router.get("/stats", auth(UserRole.USER, UserRole.ADMIN), StatsController);

export default router;
