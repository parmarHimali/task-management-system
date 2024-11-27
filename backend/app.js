import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnection } from "./databases/dbConnection.js";
import taskRouter from "./routes/allTaskRoute.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow credentials if needed
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

dbConnection();
app.use(errorMiddleware);
export default app;
