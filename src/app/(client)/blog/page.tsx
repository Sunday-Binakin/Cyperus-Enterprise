 "use client";

import React from 'react';
import { HeroSection } from '@/components/features/pages/HeroSection';
import BlogSection from '@/components/features/home/blogSection/BlogSection';
import SubscribeSection from '@/components/features/blog/SubscribeSection';

export default function BlogPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  const backgroundImage = "/images/clients/hero/slider1.JPG";

  return (
    <div className="relative">
      {/* Hero Section with Fixed Background */}
      <HeroSection 
        title="Blog"
        breadcrumbItems={breadcrumbItems}
        backgroundImage={backgroundImage}
      />
      
      {/* Scrollable Content */}
      <div className="bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16 py-16">
              {/* Blog content */}
              <BlogSection />
            </div>
          </div>
        </div>
        
        {/* Subscribe section with fixed background */}
        <SubscribeSection />
      </div>
    </div>
  );
}