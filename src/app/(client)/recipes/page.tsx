'use client';

import React from 'react';
import { HeroSection } from '@/components/features/pages/HeroSection';
import FeaturedProducts from '@/components/features/home/featured/FeaturedProducts';
import TigernutsCTA from '@/components/features/pages/TigernutsCTA';

export default function RecipesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Recipes' },
  ];

  const backgroundImage = "/images/clients/hero/slider1.JPG";

  return (
    <div className="relative">
      {/* Hero Section with Fixed Background */}
      <HeroSection 
        title="Delicious Recipes"
        breadcrumbItems={breadcrumbItems}
        backgroundImage={backgroundImage}
      />
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        <div className="bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-16 py-16">
                <FeaturedProducts />
              </div>
            </div>
          </div>
        </div>
        <TigernutsCTA />
      </div>
    </div>
  );
}
