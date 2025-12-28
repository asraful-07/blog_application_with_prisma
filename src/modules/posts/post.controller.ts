import { Request, Response } from "express";
import {
  CreatePostService,
  DeletePostService,
  GetPostService,
  GetsPostService,
  UpdatePostService,
} from "./post.service";

export const CreatePostController = async (req: Request, res: Response) => {
  try {
    const post = await CreatePostService(req.body);

    res.status(201).json({
      success: true,
      massage: "Post created successfully",
      data: post,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsPostController = async (req: Request, res: Response) => {
  try {
    const posts = await GetsPostService();

    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

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
