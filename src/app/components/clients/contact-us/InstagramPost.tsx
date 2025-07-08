'use client';

import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { InstagramPost as InstagramPostType } from './types/instagram';

interface InstagramPostProps extends InstagramPostType {
  index: number;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export const InstagramPost = ({
  imageUrl,
  link,
  alt = 'Instagram post',
  index,
  isHovered = false,
  className = '',
  onMouseEnter,
  onMouseLeave,
}: InstagramPostProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileTapped, setIsMobileTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleTap = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsMobileTapped(!isMobileTapped);
    } else {
      // Prevent triggering tap if user was trying to scroll
      if (Math.abs(e.clientX - touchStart.x) > 5 || 
          Math.abs(e.clientY - touchStart.y) > 5) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Removed unused showOverlay variable

  return (
    <div 
      className={`relative w-full h-full overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${
        isHovered ? 'scale-105 z-10' : 'scale-100'
      } ${className}`} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleTap}
    >
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-full"
        onTouchStart={(e) => {
          // Store initial touch position
          setTouchStart({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          });
        }}
        onTouchMove={(e) => {
          // Prevent scrolling if user is trying to tap
          if (Math.abs(e.touches[0].clientX - touchStart.x) > 5 || 
              Math.abs(e.touches[0].clientY - touchStart.y) > 5) {
            e.preventDefault();
          }
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoadingComplete={handleLoad}
            sizes="(max-width: 768px) 85vw, 33vw"
            priority={index < 3}
            unoptimized={process.env.NODE_ENV !== 'production'}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <FaInstagram className="text-white text-4xl" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
