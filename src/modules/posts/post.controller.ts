import { Request, Response } from "express";
import { CreatePostService } from "./post.service";

export const CreatePostController = async (req: Request, res: Response) => {
  try {
    const post = await CreatePostService(req.body);

    res
      .status(201)
      .json({ success: true, massage: "Post create successfully", data: post });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
