"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type HeroSectionProps = {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  backgroundImage: string;
  children?: React.ReactNode;
};

export function HeroSection({ breadcrumbItems, title, backgroundImage, children }: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-[80vh]">
      {/* Parallax Background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 -z-10 h-[80vh] w-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          willChange: 'transform',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[80vh] flex flex-col">
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <nav className="flex items-center text-white mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-gray-300 mx-2" />
                    </li>
                  )}
                  <li>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white">{item.label}</span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
