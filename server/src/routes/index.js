import express from "express";
import { authRouter } from "./auth.routes.js";
import { bookRouter } from "./book.routes.js";

export const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/books", bookRouter);
