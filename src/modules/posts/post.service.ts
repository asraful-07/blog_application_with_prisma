import { CommentStatus, Post, PostStatus } from "../../generated/prisma/client";
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
  sortBy: string;
  sortOrder: string;
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

  const result = await prisma.post.findMany({
    where: { AND: addCondition },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  //* pagination
  const total = await prisma.post.count({
    where: { AND: addCondition },
  });

  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const GetPostService = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const result = await tx.post.findUnique({
      where: { id },
      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED,
          },
          orderBy: { createdAt: "desc" },
          include: {
            replies: {
              where: {
                status: CommentStatus.APPROVED,
              },
              orderBy: { createdAt: "asc" },
              include: {
                replies: {
                  where: {
                    status: CommentStatus.APPROVED,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
    return result;
  });
};

export const MyPostService = async (authorId: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.user.findUniqueOrThrow({
      where: {
        id: authorId,
        status: "ACTIVE",
      },
      select: {
        id: true,
      },
    });
    const result = await tx.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return result;
  });
};

export const UpdatePostService = async (
  postId: string,
  data: Partial<Post>,
  authorId: string,
  isAdmin: boolean
) => {
  return await prisma.$transaction(async (tx) => {
    const postData = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!isAdmin && postData.authorId !== authorId) {
      throw new Error("You are not the owner/creator of the post!");
    }

    if (!isAdmin) {
      delete data.isFeatured;
    }

    const result = await tx.post.update({
      where: {
        id: postData.id,
      },
      data,
    });

    return result;
  });
};

export const DeletePostService = async (
  postId: string,
  authorId: string,
  isAdmin: boolean
) => {
  return await prisma.$transaction(async (tx) => {
    const postData = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!isAdmin && postData.authorId !== authorId) {
      throw new Error("your not real user");
    }

    const result = await tx.post.delete({
      where: { id: postId },
    });
    return result;
  });
};

export const StatsService = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalComments,
      approvedComments,
      rejectedComments,
      totalUsers,
      adminCount,
      userCount,
      postViewsAgg,
    ] = await Promise.all([
      tx.post.count(),
      tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
      tx.post.count({ where: { status: PostStatus.DRAFT } }),
      tx.post.count({ where: { status: PostStatus.ARCHIVED } }),
      tx.comment.count(),
      tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
      tx.comment.count({ where: { status: CommentStatus.REJECT } }),
      tx.user.count(),
      tx.user.count({ where: { role: "ADMIN" } }),
      tx.user.count({ where: { role: "USER" } }),
      tx.post.aggregate({ _sum: { views: true } }),
    ]);

    const totalViews = postViewsAgg._sum.views || 0;

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalComments,
      approvedComments,
      rejectedComments,
      totalUsers,
      adminCount,
      userCount,
      totalViews,
    };
  });
};
