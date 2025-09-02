"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type HeroSectionProps = {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  backgroundImage?: string; // optional to allow safe fallback
};

export function HeroSection({ breadcrumbItems, title, backgroundImage }: HeroSectionProps) {
  const hasBg = typeof backgroundImage === 'string' && backgroundImage.trim().length > 0;
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0">
          {hasBg ? (
            <Image
              src={backgroundImage as string}
              alt="Background"
              fill
              className="object-cover"
              priority
              quality={100}
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
          {/* <div className="absolute inset-0 bg-black" /> */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-48 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
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
                    <span className="text-white font-medium">{item.label}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          {title}
        </h1>
      </div>
    </div>
  );
}
