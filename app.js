import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import path from "node:path";
export const app = express();
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cors({ origin: process.env.Frontend_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/public/views"));

app.get("/", (req, res) => {
  res.status(200).json({message:"link working"});
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);
