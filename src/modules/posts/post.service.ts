import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const CreatePostService = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">
) => {
  const result = await prisma.post.create({
    data,
  });
  return result;
};
