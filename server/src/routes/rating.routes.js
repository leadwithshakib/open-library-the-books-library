import express from "express";
import {
  deleteRating,
  getRatingsByBook,
  giveARating,
  updateRating,
} from "../controllers/rating.controllers.js";

export const ratingRouter = express.Router();

ratingRouter.post("/", giveARating);
ratingRouter.get("/:bookId", getRatingsByBook);
ratingRouter.delete("/:ratingId", deleteRating);
ratingRouter.put("/:ratingId", updateRating);
