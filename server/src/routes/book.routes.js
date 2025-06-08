import express from "express";
import {
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:bookId", getBookById); // Assuming getBooks can handle both all books and a specific book by ID
bookRouter.put("/:bookId", updateBook); // Assuming this is for updating a book by ID
bookRouter.delete("/:bookId", deleteBook); // Assuming this is for updating a book by ID
