type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
          <div className="flex items-center mb-2">
            <div className="font-medium text-white">{review.user}</div>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}>
                  {i < review.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-300">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
