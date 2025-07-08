"use client";

import React from 'react';
import { HeroSection } from '@/app/components/clients/contact-us/HeroSection';
import ContactInfoCards from '@/app/components/clients/contact-us/ContactCards';
import ContactForm from '@/app/components/clients/contact-us/ContactForm';
import ContactMap from '@/app/components/clients/contact-us/ContactMap';
import InstagramGallery from '@/app/components/clients/contact-us/InstagramGallery';

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact' },
  ];

  // Ensure the image path is correct
  const backgroundImage = "/images/clients/hero/slider1.JPG";

  return (
    <div className="relative">
      {/* Hero Section with Fixed Background */}
      <HeroSection 
        title="Contact Us"
        breadcrumbItems={breadcrumbItems}
        backgroundImage={backgroundImage}
      />
      
      {/* Scrollable Content */}
      <div className="bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16 py-16">
              <ContactInfoCards />
              <ContactForm />
              <ContactMap />
            </div>
            <InstagramGallery />
          </div>
        </div>
      </div>
    </div>
  );
}

                         
