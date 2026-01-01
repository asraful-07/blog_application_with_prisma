import { Request, Response } from "express";
import {
  CreatePostService,
  DeletePostService,
  GetPostService,
  GetsPostService,
  UpdatePostService,
} from "./post.service";
import { PostStatus } from "../../generated/prisma/enums";

export const CreatePostController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const post = await CreatePostService({
      ...req.body,
      authorId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsPostController = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const searchString = typeof search === "string" ? search : undefined;

    //* multiple tags search
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    //* true or false
    //? const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;

    //* enum value
    const status = req.query.status as PostStatus | undefined;

    //* authorId
    const authorId = req.query.authorId as string | undefined;

    const posts = await GetsPostService({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
    });
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetPostController = async (req: Request, res: Response) => {
  try {
    const post = await GetPostService(req.params.id as string);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdatePostController = async (req: Request, res: Response) => {
  try {
    const updatedPost = await UpdatePostService(
      req.params.id as string,
      req.body
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeletePostController = async (req: Request, res: Response) => {
  try {
    const post = await DeletePostService(req.params.id as string);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
