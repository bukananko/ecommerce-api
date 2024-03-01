import express from "express";
import * as controller from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/owned", controller.getOwnedProducts);

export { router as productRouter };
