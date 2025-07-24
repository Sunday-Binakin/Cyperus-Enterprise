"use client";

import React from 'react';
import Image from 'next/image';

export const ParallaxSection = () => {
  return (
    <div className="relative h-[400px] overflow-hidden ml-2 mr-2">
      {/* Parallax Background Image */}
      <div className="absolute inset-0 bg-fixed">
        <Image
          src="/images/clients/hero/slider1.JPG"
          alt="Parallax Background"
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
          priority={false}
        />
        {/* Optional overlay for better content visibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Optional content that scrolls over the fixed background */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Add any content here if needed - currently empty as per requirements */}
      </div>
    </div>
  );
};
