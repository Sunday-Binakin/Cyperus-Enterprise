'use client';

import { useState } from 'react';
import { Tabs } from '@/app/components/ui/Tabs';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

type ProductTabsProps = {
  description: string;
  reviews: Array<{
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
};

export function ProductTabs({ description, reviews }: ProductTabsProps) {
  const [allReviews, setAllReviews] = useState(reviews);

  const handleReviewSubmit = (newReview: { rating: number; comment: string }) => {
    // In a real app, you would send this to your backend
    const review = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'You',
      ...newReview,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setAllReviews([review, ...allReviews]);
  };

  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-gray-300 text-lg">{description}</p>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Benefits</h3>
            <ul className="space-y-3 list-disc pl-5">
              <li className="text-gray-300">Rich in antioxidants that help fight free radicals</li>
              <li className="text-gray-300">Supports immune system function</li>
              <li className="text-gray-300">May help with respiratory health</li>
              <li className="text-gray-300">Natural source of caffeine for energy</li>
              <li className="text-gray-300">Contains anti-inflammatory properties</li>
            </ul>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">How to Use</h3>
            <p className="text-gray-300">
              Chew 1-2 pieces daily as needed. For best results, consume in the morning or before meals. 
              The natural bitterness can be balanced by drinking water or herbal tea afterward.
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Storage Instructions</h3>
            <p className="text-gray-300">
              Store in a cool, dry place away from direct sunlight. For extended freshness, 
              keep in an airtight container. Properly stored, our bitter kola can last up to 6 months.
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Origin & Quality</h3>
            <p className="text-gray-300">
              Sourced from sustainable farms in West Africa, our bitter kola is hand-selected for quality and freshness. 
              Each batch is carefully inspected to ensure you receive only the best product.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'reviews',
      label: `Reviews (${allReviews.length})`,
      content: (
        <div className="space-y-8">
          <ReviewForm onSubmit={handleReviewSubmit} />
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4">Customer Reviews</h3>
            <ReviewList reviews={allReviews} />
          </div>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} className="mt-12" />;
}
