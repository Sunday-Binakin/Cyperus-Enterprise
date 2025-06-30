'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDES } from './constants';

// interface Slide {
//   image: string;
//   title: string;
//   subtitle: string;
//   primaryButton: {
//     text: string;
//     link: string;
//   };
//   secondaryButton: {
//     text: string;
//     link: string;
//   };
// }

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="relative w-full h-[calc(80vh-80px)] md:h-[calc(100vh-80px)] overflow-hidden">
      {/* Slides */}
      <div 
        className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-start justify-start text-white px-4 md:px-16 lg:px-24">
              <p className="text-lg md:text-xl mb-4 tracking-wider mt-4">WELCOME TO TIGERNUTS REPUBLIC</p>
              <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">{slide.title}</h1>
              <h2 className="text-5xl md:text-7xl mb-12 font-light">{slide.subtitle}</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={slide.primaryButton.link}
                  className="bg-[#55006F] text-white px-8 py-4 rounded hover:bg-[#55006F]/90 transition-colors text-lg font-semibold tracking-wide"
                >
                  {slide.primaryButton.text}
                </a>
                <a 
                  href={slide.secondaryButton.link}
                  className="bg-white text-[#55006F] px-8 py-4 rounded hover:bg-gray-100 transition-colors text-lg font-semibold tracking-wide"
                >
                  {slide.secondaryButton.text}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 