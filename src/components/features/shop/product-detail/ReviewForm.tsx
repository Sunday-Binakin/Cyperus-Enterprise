'use client';

import { useState } from 'react';

type ReviewFormProps = {
  onSubmit: (review: { rating: number; comment: string }) => void;
};

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    onSubmit({ rating, comment });
    setComment('');
    setRating(5);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
      <h3 className="text-lg font-medium text-white mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
                aria-label={`Rate ${star} out of 5`}
              >
                {star <= rating ? '★' : '☆'}
                <span className="sr-only">{star} stars</span>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-400">
              {rating} out of 5
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EFE554] focus:border-transparent"
            placeholder="Share your thoughts about this product..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2 bg-[#EFE554] text-black font-medium rounded-md hover:bg-[#d4ce4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] focus:ring-offset-gray-900 transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
