import { Request, Response } from "express";
import {
  CreatePostService,
  DeletePostService,
  GetPostService,
  GetsPostService,
  MyPostService,
  StatsService,
  UpdatePostService,
} from "./post.service";
import { PostStatus } from "../../generated/prisma/enums";
import { paginationSorting } from "../../helper/paginationSorting";
import { UserRole } from "../../middleware/auth";

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

    //* pagination and sorting desc
    const { page, limit, skip, sortBy, sortOrder } = paginationSorting(
      req.query
    );

    const posts = await GetsPostService({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
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

    res.status(200).json({ success: true, data: post });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const MyPostController = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const post = await MyPostService(user?.id);

    res.status(200).json({ success: true, data: post });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdatePostController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const isAdmin = user?.role === UserRole.ADMIN;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const updatedPost = await UpdatePostService(
      req.params.id as string,
      req.body,
      user.id,
      isAdmin
    );

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
    const user = req.user;

    const isAdmin = user?.role === UserRole.ADMIN;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const post = await DeletePostService(
      req.params.id as string,
      user?.id,
      isAdmin
    );

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const StatsController = async (req: Request, res: Response) => {
  try {
    const stats = await StatsService();

    res.status(200).json({ success: true, message: "All data", data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
