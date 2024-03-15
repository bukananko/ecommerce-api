import prisma from "../lib/prisma.js";

export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      cart: {
        select: {
          userId: true,
          productId: true,
        },
      },
    },
  });
};

export const createNewUser = async ({ username, password }) => {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
};

export const editUser = async ({ id, username }) => {
  return await prisma.user.update({
    where: { id },
    data: {
      username,
    },
  });
};
