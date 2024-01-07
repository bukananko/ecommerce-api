import prisma from "../lib/prisma.js";

export const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({ where: { username } });

  return user;
};

export const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

export const createNewUser = async ({ username, password }) => {
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return newUser;
};

export const editUser = async ({ id, username }) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      username,
    },
  });

  return updatedUser;
};
