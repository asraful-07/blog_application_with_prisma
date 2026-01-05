import { CommentStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export const CreateCommentService = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  await prisma.post.findUniqueOrThrow({
    where: { id: payload.postId },
  });

  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }

  const result = await prisma.comment.create({
    data: payload,
  });

  return result;
};

export const GetCommentService = async (id: string) => {
  const result = await prisma.comment.findUnique({
    where: {
      id: id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          thumbnail: true,
          views: true,
        },
      },
    },
  });

  return result;
};

export const GetCommentByAuthorService = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return result;
};

export const DeleteCommentService = async (
  commentId: string,
  authorId: string
) => {
  const commentData = prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  if (!commentData) {
    throw new Error("Your provided input is invalid!");
  }

  const result = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return result;
};

export const UpdateCommentService = async (
  commentId: string,
  data: { content?: string; status?: CommentStatus },
  authorId: string
) => {
  const updatedData = prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  if (!updatedData) {
    throw new Error("Data not mach data invalid conditional");
  }

  const result = prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data,
  });

  return result;
};
