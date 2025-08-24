import React from 'react';
import Image from 'next/image';
import { INSTAGRAM_IMAGES } from './constants';

interface InstagramImageProps {
  src: string;
  alt: string;
}

function InstagramImage({ src, alt }: InstagramImageProps) {
  return (
    <div className="aspect-[4/3] w-full h-full overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={150}
        className="transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default function InstagramFeed() {
  return (
    <div className="w-full">
      {/* Title */}
      <p className='font-semibold text-white text-lg md:text-xl lg:text-2xl mt-4 mb-4 px-4 md:px-0'>
        Follow Us On Instagram
      </p>
      
      {/* Responsive Grid Layout */}
      <div className="px-4 md:px-0">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 w-full max-w-md mx-auto md:mx-0">
          {INSTAGRAM_IMAGES.map((src, idx) => (
            <div key={idx} className="w-full aspect-[4/3] min-w-0">
              <InstagramImage src={src} alt={`Instagram post ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 