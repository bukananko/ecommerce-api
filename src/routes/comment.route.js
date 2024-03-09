import express from "express";
import * as controller from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:productId", controller.getCommentsOnProduct);
router.post("/:productId", controller.createComment);

export { router as commentRouter };
