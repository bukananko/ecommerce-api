import prisma from "../lib/prisma.js";

export const createNewCartItem = ({ userId, productId, qty }) => {
  return prisma.cart.create({
    data: {
      productId,
      userId,
      qtyItem: qty,
    },
  });
};

export const findCartByUserId = ({ userId, skip }) => {
  return prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
    skip,
    take: 10,
  });
};

export const updateCartByCartId = ({ cartId, qty }) => {
  return prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      qtyItem: qty,
    },
  });
};

export const deleteCartByCartId = ({ cartId }) => {
  return prisma.cart.delete({
    where: {
      id: cartId,
    },
  });
}