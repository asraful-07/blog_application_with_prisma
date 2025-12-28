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

export const GetsPostService = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const GetPostService = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: { id },
  });
  return result;
};

//? type UpdatePostInput = {
//   title?: string;
//   content?: string;
//   thumbnail?: string;
//   isFeatured?: boolean;
//   status?: PostStatus;
//   tags?: string[];
// };
//? export const UpdatePostService = async (id: string, data: UpdatePostInput)

export const UpdatePostService = async (
  id: string,
  data: Partial<Omit<Post, "id" | "createdAt" | "updatedAt">>
) => {
  const result = await prisma.post.update({
    where: { id },
    data,
  });

  return result;
};

export const DeletePostService = async (id: string) => {
  const result = await prisma.post.delete({
    where: { id },
  });
  return result;
};
