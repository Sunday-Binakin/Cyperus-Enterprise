"use client";

import React from 'react';
import { HeroSection } from '@/app/components/clients/about/HeroSection';
import { WhyCyperus } from '@/app/components/clients/about/WhyCyperus';

export default function AboutUsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },
  ];

  const backgroundImage = "/images/clients/hero/slider1.JPG";

  return (
    <div className="relative">
      <HeroSection 
        title="About Us"
        breadcrumbItems={breadcrumbItems}
        backgroundImage={backgroundImage}
      />
      <WhyCyperus />
    </div>
  );
}
    