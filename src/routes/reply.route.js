import express from "express";
import * as controller from "../controllers/reply.controller.js";

const router = express.Router();

router.post("/:commentId", controller.createReply);

export { router as replyRouter };
