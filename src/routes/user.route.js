import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.patch("/edit/profile", controller.updateUser);

export { router as userRouter };
