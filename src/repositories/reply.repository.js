import prisma from "../lib/prisma.js";

export const createNewReply = async ({ commentId, text, userId }) => {
  return await prisma.reply.create({
    data: {
      commentId,
      text,
      userId,
    },
  });
}