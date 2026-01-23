import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const GetsUserService = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const GetUserService = async (
  id: string,
  isAdmin: boolean,
  authorId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    if (!isAdmin && user.id !== authorId) {
      throw new Error("Unauthorized user");
    }

    const result = await tx.user.findUnique({
      where: {
        id: id,
      },
    });

    return result;
  });
};

export const UpdateUserService = async (
  id: string,
  data: Partial<User>,
  isAdmin: boolean,
  authorId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    if (!isAdmin && user.id !== authorId) {
      throw new Error("Unauthorized user");
    }

    const result = await tx.user.update({
      where: {
        id: id,
      },
      data,
    });

    return result;
  });
};

export const DeleteUserService = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};
