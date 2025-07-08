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
  backgroundImage: string;
};

export function HeroSection({ breadcrumbItems, title, backgroundImage }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col justify-center items-start px-4 md:px-8 lg:px-16 pt-32 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-300">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
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
