import express from "express";
import * as controller from "../controllers/product.controller.js";

const router = express.Router();

router.get("/search", controller.getProductsByQuery);
router.post("/", controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/owned", controller.getOwnedProducts);
router.patch("/:id", controller.editProductById);
router.get("/:id", controller.getProductById);

export { router as productRouter };
