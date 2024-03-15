import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";
import { productRouter } from "./routes/product.route.js";
import { commentRouter } from "./routes/comment.route.js";
import { replyRouter } from "./routes/reply.route.js";
import { cartRouter } from "./routes/cart.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/comment", commentRouter);
app.use("/reply", replyRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
