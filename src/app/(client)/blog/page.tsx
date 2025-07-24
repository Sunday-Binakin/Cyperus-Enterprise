 "use client";

import React from 'react';
import { HeroSection } from '@/app/components/shared/HeroSection';
import BlogSection from '@/app/components/clients/Landing-Page/blogSection/BlogSection';
import SubscribeSection from '@/app/components/clients/blog/SubscribeSection';

export default function BlogPage() {
  return (
    <div>
      <HeroSection
        title="Blog"
        backgroundImage="/images/clients/hero/slider1.JPG"
        height="medium"
        contentPosition="center"
        overlayOpacity={60}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: undefined }
        ]}
        className="text-white font-bold text-2xl"
      />

      {/* Blog content */}
      <BlogSection />
      
      {/* Subscribe section with fixed background */}
      <SubscribeSection />
    </div>
  );
}