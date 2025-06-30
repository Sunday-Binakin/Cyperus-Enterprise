'use client'
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCT_CATEGORIES } from './constants';
import CategoryCard from './CategoryCard';

export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideToIndex = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % PRODUCT_CATEGORIES.length;
    slideToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + PRODUCT_CATEGORIES.length) % PRODUCT_CATEGORIES.length;
    slideToIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Previous category"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Next category"
        >
          <ChevronRight size={24} />
        </button>

        {/* Categories Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {PRODUCT_CATEGORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => slideToIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-[#EFE554]' : 'bg-gray-500'
              }`}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 