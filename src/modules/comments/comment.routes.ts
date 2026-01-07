import express from "express";
import {
  CommentUpdateController,
  CreateCommentController,
  DeleteCommentController,
  GetCommentByAuthorController,
  GetCommentController,
  UpdateCommentController,
} from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();
router.post(
  "/comment",
  auth(UserRole.USER, UserRole.ADMIN),
  CreateCommentController
);

router.get("/comment/id/:id", GetCommentController);
router.get("/comment/author/:authorId", GetCommentByAuthorController);

router.delete(
  "/comment/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  DeleteCommentController
);

router.patch(
  "/comment/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  UpdateCommentController
);

router.patch(
  "/comment-update/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  CommentUpdateController
);

export default router;
