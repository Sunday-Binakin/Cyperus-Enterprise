"use client";

import React from 'react';
import { HeroSection } from '@/components/features/pages/HeroSection';
import { SubscriptionPlans } from '@/components/features/pages/SubscriptionPlans';

export default function SubscribeAndSavePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Subscribe & Save' }
  ];

  return (
    <div className="relative">
      {/* Hero Section with Parallax */}
      <HeroSection
        title="Subscribe & Save"
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/images/clients/hero/slider1.JPG"
      >
        <div className="max-w-3xl">
          <p className="text-xl text-gray-200 mb-8">
            Get your favorite products delivered on your schedule with exclusive savings
          </p>
        </div>
      </HeroSection>

      {/* Subscription Plans Section */}
      <SubscriptionPlans />
    </div>
  );
}
