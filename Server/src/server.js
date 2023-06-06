import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { userRouter } from "./Api/User/user.route.js";
import { blogRouter } from "./Api/Blog/blog.route.js";
import { authRouter } from "./Api/Auth/auth.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRouter);

await mongoose.connect(
  "mongodb+srv://hareez531hk:ApIfjqi8yECl2xZi@blogger-cluster.jsa41t0.mongodb.net/blogger-cluster?retryWrites=true&w=majority"
);

app.listen(7000, () => {
  console.log("app is listening at port 7000");
});
