import express from "express";
import * as controller from "../controllers/cart.controller.js";

const router = express.Router();

router.patch("/:cartId", controller.patchCartByCartId);
router.delete("/:cartId", controller.deleteCart);
router.post("/:productId", controller.addToCart);
router.get("/:userId", controller.getCartByUserId);

export { router as cartRouter };
