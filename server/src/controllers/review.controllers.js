import { asyncHandler } from "../utils/asyncHandler.js";

export const giveAReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  // Validate input
  if (!rating || !review) {
    return res.status(400).json({ message: "Rating and review are required." });
  }

  // Assuming we have a Review model to handle database operations
  const newReview = await Review.create({
    bookId,
    userId: req.user._id,
    rating,
    review,
  });

  res.status(201).json(newReview);
});
export const getReviewsByBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  // Assuming we have a Review model to handle database operations
  const reviews = await Review.find({ bookId }).populate(
    "userId",
    "name avatar"
  );

  if (!reviews || reviews.length === 0) {
    return res.status(404).json({ message: "No reviews found for this book." });
  }

  res.status(200).json(reviews);
});
export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  // Assuming we have a Review model to handle database operations
  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found." });
  }

  // Check if the user is authorized to delete the review
  if (review.userId.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this review." });
  }

  await review.remove();
  res.status(200).json({ message: "Review deleted successfully." });
});
export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review } = req.body;

  // Validate input
  if (!rating || !review) {
    return res.status(400).json({ message: "Rating and review are required." });
  }

  // Assuming we have a Review model to handle database operations
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { rating, review },
    { new: true }
  );

  if (!updatedReview) {
    return res.status(404).json({ message: "Review not found." });
  }

  res.status(200).json(updatedReview);
});
