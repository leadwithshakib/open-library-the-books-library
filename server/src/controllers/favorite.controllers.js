import { asyncHandler } from "../utils/asyncHandler.js";

export const makeItMyFavorite = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  // Logic to add a book to favorites
  res
    .status(201)
    .json({ message: `Book with ID ${bookId} added to favorites` });
});
export const getMyFavorites = asyncHandler(async (req, res) => {
  // Logic to get all favorite books for the user
  res.status(200).json({ message: "Favorite books retrieved successfully" });
});
export const deleteFavorite = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  // Logic to remove a book from favorites
  res
    .status(200)
    .json({ message: `Book with ID ${bookId} removed from favorites` });
});
