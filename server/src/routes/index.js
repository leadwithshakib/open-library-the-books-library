import express from "express";
import { authRouter } from "./auth.routes.js";
import { bookRouter } from "./book.routes.js";
import { favoriteRouter } from "./favorite.routes.js";
import { ratingRouter } from "./rating.routes.js";
import { reviewRouter } from "./review.routes.js";

export const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/books", bookRouter);
routes.use("/reviews", reviewRouter);
routes.use("/ratings", ratingRouter);
routes.use("/favorites", favoriteRouter);
