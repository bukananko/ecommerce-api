import {
  createNewCartItem,
  deleteCartByCartId,
  findCartByUserId,
  updateCartByCartId,
} from "../repositories/cart.repository.js";
import { findUserById } from "../repositories/user.repository.js";

export const addToCart = async (req, res) => {
  const { userId, qty } = req.body;
  const { productId } = req.params;

  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await findUserById(userId);

    const isExist = user.cart.find(
      (item) => item.productId === productId && item.userId === userId
    );

    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "This item already in your cart" });
    }

    await createNewCartItem({
      userId,
      productId,
      qty,
    });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  const { skip } = req.query;

  try {
    const cart = await findCartByUserId({
      userId,
      skip: Number(skip),
    });

    res.json({ success: true, data: cart });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const patchCartByCartId = async (req, res) => {
  const { cartId } = req.params;
  const { qty } = req.body;

  try {
    await updateCartByCartId({
      cartId,
      qty,
    });

    res.json({ success: true, message: "Update successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    await deleteCartByCartId({
      cartId,
    });

    res.json({ success: true, message: "Delete successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
