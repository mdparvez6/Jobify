import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { body, validationResult } from "express-validator";
//routers

import jobRouter from "./routers/jobRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouer from "./routers/userRouter.js";

import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouer);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
