'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const DEFAULT_IMAGE = '/images/clients/hero/slider1.JPG';
const PARALLAX_RATIO = 0.5;
const TRANSITION_DURATION = '0.1s';

function useParallax() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMounted(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isMounted, scrollY };
}

export default function ParallaxCTA({
  backgroundImage = DEFAULT_IMAGE,
  className = ''
}) {
  const { isMounted, scrollY } = useParallax();
  const bgRef = useRef(null);

  const transformStyle = isMounted
    ? { transform: `translate3d(0, ${scrollY * PARALLAX_RATIO}px, 0)` }
    : {};

  return (
   
<section
  className={`relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-transparent ${className}`}
  style={{ background: 'transparent' }}
>
  {/* Parallax Background Image */}
  <div
    ref={bgRef}
    className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      ...transformStyle,
      transition: isMounted
        ? `transform ${TRANSITION_DURATION} ease-out`
        : 'none',
      backgroundColor: 'transparent', // fallback
    }}
    aria-hidden="true"
  />
 

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-yellow-400 text-2xl md:text-3xl font-bold drop-shadow-lg mb-2">
          YOU DON'T HAVE TO WAIT ANY LONGER
        </h2>
        <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-6">
          Enjoy The Goodness Of Tigernuts Today
        </h3>
        <Link
          href="/contact-us"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Contact Us"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  );
}
