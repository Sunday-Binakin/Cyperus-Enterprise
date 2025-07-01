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
}

export const InstagramPost = ({
  imageUrl,
  link,
  alt = 'Instagram post',
  index,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}: InstagramPostProps) => {
  const [isMobileTapped, setIsMobileTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleTap = () => {
    if (isMobile) {
      setIsMobileTapped(!isMobileTapped);
    }
  };

  const showOverlay = isMobile ? isMobileTapped : isHovered;
  
  const roundedClass = index === 0 
    ? 'md:rounded-r-lg' 
    : index === 2 
      ? 'md:rounded-l-lg' 
      : '';

  return (
    <div 
      className={`relative group overflow-hidden ${roundedClass} aspect-square`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleTap}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <Image
          src={imageUrl}
          alt={alt}
          width={500}
          height={500}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay with Instagram icon */}
        <div 
          className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            showOverlay ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <FaInstagram className="text-white text-4xl" />
        </div>
      </a>
    </div>
  );
};
