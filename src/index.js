import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
