'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import { addReview, CURRENT_USER_ID } from '@/lib/data';

interface ReviewFormProps {
  bookId: string;
}

export default function ReviewForm({ bookId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add review to data
    addReview({
      bookId,
      userId: CURRENT_USER_ID,
      userName: 'John Doe', // In a real app, this would come from user data
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    });
    
    // Reset form
    setRating(0);
    setComment('');
    setIsSubmitting(false);
    
    // Show success message (in a real app, you'd handle this better)
    alert('Review submitted successfully!');
    
    // Refresh the page to show the new review
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating
        </label>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          interactive={true}
          size="lg"
        />
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
      
      <button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}