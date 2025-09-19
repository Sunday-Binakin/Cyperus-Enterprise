"use client";

import React from 'react';
import { HeroSection } from '@/app/components/clients/contact-us/HeroSection';
import ExportInfoSection from '@/app/components/clients/export-department/ExportInfoSection';
import ExportOfferingsSection from '@/app/components/clients/export-department/ExportOfferingsSection';
import WhyChooseUsSection from '@/app/components/clients/export-department/WhyChooseUsSection';
import PartnershipSection from '@/app/components/clients/export-department/PartnershipSection';
import ExportInquiryForm from '@/app/components/clients/export-department/ExportInquiryForm';

export default function ExportDepartmentPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Export Department' },
  ];

  // Ensure the image path is correct
  const backgroundImage = "/images/clients/hero/slider1.JPG";

  return (
    <div className="relative">
      {/* Hero Section with Fixed Background */}
      <HeroSection 
        title="🌍 Export Department"
        breadcrumbItems={breadcrumbItems}
        backgroundImage={backgroundImage}
      />
      
      {/* Scrollable Content */}
      <div className="bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16 py-16">
              <ExportInfoSection />
              <ExportOfferingsSection />
              <WhyChooseUsSection />
              <PartnershipSection />
              <ExportInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
