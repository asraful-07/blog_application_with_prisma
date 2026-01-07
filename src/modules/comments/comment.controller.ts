import { RequestHandler } from "express";
import {
  CommentUpdateService,
  CreateCommentService,
  DeleteCommentService,
  GetCommentByAuthorService,
  GetCommentService,
  UpdateCommentService,
} from "./comment.service";

export const CreateCommentController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const comment = await CreateCommentService(req.body);

    return res
      .status(201)
      .json({ success: true, message: "Created comment", data: comment });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// if (!req.user) {
//   return res.status(401).json({ success: false, message: "Unauthorized" });
// }

export const GetCommentController: RequestHandler = async (req, res) => {
  try {
    const comment = await GetCommentService(req.params.id as string);

    return res
      .status(200)
      .json({ success: true, message: "fetch data", data: comment });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetCommentByAuthorController: RequestHandler = async (
  req,
  res
) => {
  try {
    const { authorId } = req.params;
    const comment = await GetCommentByAuthorService(authorId as string);

    return res
      .status(200)
      .json({ success: true, message: "fetch data", data: comment });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeleteCommentController: RequestHandler = async (req, res) => {
  try {
    const comment = await DeleteCommentService(
      req.params.commentId as string,
      req.params.authorId as string
    );

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Deleted successfully done" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateCommentController: RequestHandler = async (req, res) => {
  try {
    const comment = await UpdateCommentService(
      req.params.commentId as string,
      req.body,
      req.params.authorId as string
    );

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully done",
      data: comment,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const CommentUpdateController: RequestHandler = async (req, res) => {
  try {
    const commentUpdate = await CommentUpdateService(
      req.params.commentId as string,
      req.body
    );

    res
      .status(200)
      .json({ success: true, message: "Updated comment", data: commentUpdate });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
