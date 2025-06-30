import React from 'react';
import Image from 'next/image';
import { INSTAGRAM_IMAGES } from './constants';

interface InstagramImageProps {
  src: string;
  alt: string;
}

function InstagramImage({ src, alt }: InstagramImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className="transition-transform duration-300 ease-out-in hover:scale-110 cursor-pointer w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] object-cover rounded"
    />
  );
}

export default function InstagramFeed() {
  return (
    <div className="w-full md:w-[25%]">
      <p className='font-semibold text-white text-xl sm:text-2xl mt-4'>Follow Us On Instagram</p>
      <div className="flex flex-col mt-4">
        <div className="flex flex-row gap-2 sm:gap-x-0.5 sm:-gap-y-8">
          {INSTAGRAM_IMAGES.slice(0, 3).map((src, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <InstagramImage src={src} alt="Instagram" />
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 sm:gap-x-0.5 sm:-gap-y-4 mt-1">
          {INSTAGRAM_IMAGES.slice(3, 6).map((src, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <InstagramImage src={src} alt="Instagram" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 