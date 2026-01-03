import { Post, PostStatus } from "../../generated/prisma/client";
import { PostWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export const CreatePostService = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">
) => {
  const result = await prisma.post.create({
    data,
  });
  return result;
};

export const GetsPostService = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string | undefined;
  sortOrder: string | undefined;
}) => {
  const addCondition: PostWhereInput[] = [];

  //* search query
  if (search) {
    addCondition.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }

  //* multiple tags search
  if (tags?.length > 0) {
    addCondition.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  //* true or false
  if (typeof isFeatured === "boolean") {
    addCondition.push({ isFeatured });
  }

  //* enum value
  if (status) {
    addCondition.push({ status });
  }

  //* authorId
  if (authorId) {
    addCondition.push({ authorId });
  }

  //* pagination

  const result = await prisma.post.findMany({
    where: { AND: addCondition },
    take: limit,
    skip,
  });
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
