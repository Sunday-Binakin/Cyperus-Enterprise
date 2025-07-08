'use client';

import { useState, useEffect, useCallback } from 'react';
import { InstagramPost } from './InstagramPost';
import { INSTAGRAM_POSTS } from './types/instagram';

export const InstagramGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Get the current set of 5 posts (left-half, center-3, right-half)
  const getDisplayedPosts = useCallback(() => {
    const length = INSTAGRAM_POSTS.length;
    return {
      leftHalf: INSTAGRAM_POSTS[(currentIndex - 1 + length) % length],
      center: [
        INSTAGRAM_POSTS[currentIndex % length],
        INSTAGRAM_POSTS[(currentIndex + 1) % length],
        INSTAGRAM_POSTS[(currentIndex + 2) % length]
      ],
      rightHalf: INSTAGRAM_POSTS[(currentIndex + 3) % length]
    };
  }, [currentIndex]);

  const { leftHalf, center, rightHalf } = getDisplayedPosts();

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
          
          {/* Desktop layout */}
          <div className="hidden lg:block relative w-full max-w-[2800px] mx-auto px-16">
            <div className="flex items-stretch h-[600px] gap-8">
              {/* Left half image - made slightly wider */}
              <div className="w-[15%] overflow-hidden rounded-lg">
                <div className="w-[200%] h-full transform -translate-x-1/4">
                  <InstagramPost
                    {...leftHalf}
                    index={-1}
                    className="pointer-events-none h-full object-cover"
                    isHovered={false}
                  />
                </div>
              </div>

              {/* Center 3 full images - increased width */}
              <div className="flex-[2] grid grid-cols-3 gap-8">
                {center.map((post, index) => (
                  <div 
                    key={`center-${post.id}-${index}`}
                    className="h-full transition-all duration-300 ease-in-out"
                  >
                    <InstagramPost
                      {...post} 
                      index={index}
                      className="h-full w-[100rem]"
                      isHovered={hoveredIndex === index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                ))}
              </div>

              {/* Right half image - made slightly wider */}
              <div className="w-[15%] overflow-hidden rounded-lg">
                <div className="w-[200%] h-full">
                  <InstagramPost
                    {...rightHalf}
                    index={INSTAGRAM_POSTS.length}
                    className="pointer-events-none h-full object-cover"
                    isHovered={false}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Tablet layout (original 3-column grid) */}
          <div className="hidden md:block lg:hidden relative w-full">
            <div className="grid grid-cols-3 gap-4">
              {center.map((post, index) => (
                <div 
                  key={`tablet-${post.id}-${index}`}
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
