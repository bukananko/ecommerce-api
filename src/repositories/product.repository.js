import prisma from "../lib/prisma.js";

export const createNewProduct = ({
  name,
  description,
  price,
  stock,
  category = "Random",
  image,
  userId,
}) => {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      category,
      image,
      userId,
    },
  });
};

export const findOwnedProductsByUserId = ({ userId, skip }) => {
  return prisma.product.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: 10,
    include: {
      owner: {
        select: {
          password: false,
          username: true,
        },
      },
    },
  });
};

export const findAllProducts = ({ skip }) => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: 10,
    include: {
      owner: {
        select: {
          password: false,
          username: true,
        },
      },
    },
  });
};
