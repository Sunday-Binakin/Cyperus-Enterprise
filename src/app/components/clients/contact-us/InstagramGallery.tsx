'use client';

import { useState, useEffect, useCallback } from 'react';
import { InstagramPost } from './InstagramPost';
import { INSTAGRAM_POSTS } from './types/instagram';

export const InstagramGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Get the next set of 3 posts
  const getDisplayedPosts = useCallback(() => {
    return [
      INSTAGRAM_POSTS[currentIndex % INSTAGRAM_POSTS.length],
      INSTAGRAM_POSTS[(currentIndex + 1) % INSTAGRAM_POSTS.length],
      INSTAGRAM_POSTS[(currentIndex + 2) % INSTAGRAM_POSTS.length]
    ];
  }, [currentIndex]);

  const displayedPosts = getDisplayedPosts();

  // Auto-rotate images every 10 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % INSTAGRAM_POSTS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
  };

  return (
    <div className="w-full py-16 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">
          Follow Us on Instagram
        </h2>
        
        <div className="relative w-full">
          {/* Mobile horizontal scroll container */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-4 w-max">
              {INSTAGRAM_POSTS.map((post, index) => (
                <div 
                  key={`mobile-${post.id}-${index}`}
                  className="w-[85vw] flex-shrink-0"
                >
                  <InstagramPost
                    {...post}
                    index={index}
                    isHovered={false} // Disable hover on mobile
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop grid layout */}
          <div className="hidden md:block relative w-[100vw] left-1/2 right-1/2 -mx-[50vw] px-4">
            <div className="grid grid-cols-3 gap-2 max-w-[2000px] mx-auto">
              {displayedPosts.map((post, index) => (
                <div 
                  key={`desktop-${post.id}-${index}`}
                  className="transition-all duration-300 ease-in-out"
                >
                  <InstagramPost
                    {...post}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
