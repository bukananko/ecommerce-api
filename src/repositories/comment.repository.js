import prisma from "../lib/prisma.js";

export const createNewComment = async ({ productId, text, userId }) => {
  return await prisma.comment.create({
    data: {
      productId,
      text,
      userId,
    },
  });
};

export const findCommentsByProductId = async ({ productId, skip }) => {
  return await prisma.comment.findMany({
    where: {
      productId,
    },
    include: {
      owner: {
        select: {
          id: true,
          picture: true,
          username: true,
        },
      },
      reply: {
        include: {
          owner: {
            select: {
              id: true,
              picture: true,
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: 10,
  });
};
