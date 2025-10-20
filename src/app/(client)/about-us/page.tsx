"use client";

import React from 'react';
import { HeroSection } from '@/app/components/shared/HeroSection';
import { WhyCyperus } from '@/components/features/pages/WhyCyperus';
import { PeopleMayAsk } from '@/components/features/pages/PeopleMayAsk';
import OurStats from '@/components/features/pages/OurStats';
import InstagramGallery from '@/components/features/pages/InstagramGallery';
import Testimonials from '@/components/features/home/TestimonialsSection';
import '@/components/features/pages/responsive.css';


export default function AboutUsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },
  ];

  return (
    <div className="relative">
      {/* Global Parallax Background for spacing areas */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/clients/hero/slider1.JPG')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <HeroSection
        title="About Us"
        backgroundImage="/images/clients/hero/slider1.JPG"
        height="full"
        contentPosition="left"
        overlayOpacity={40}
        breadcrumbItems={breadcrumbItems}
        className="text-white font-bold relative z-10"
      />

      {/* Main Content - Normal scrolling sections */}
      <main className="relative z-10">
        {/* Why Cyperus Section */}
        <section className="mx-2 py-8 sm:py-12 lg:py-16">
          <WhyCyperus />
        </section>
        
        {/* FAQ Section */}
        <section className="mx-2 py-8 sm:py-12 lg:py-16">
          <PeopleMayAsk />
        </section>
        
        {/* Stats Section */}
        <section className="mx-2 py-8 sm:py-12 lg:py-16">
          <OurStats />
        </section>
        
        {/* CEO Section */}
        {/* <section className="mx-2 py-8 sm:py-12 lg:py-16">
          <MeetOurCeo />
        </section> */}
        
        {/* Testimonials Section */}
        <section className="mx-2">
          <Testimonials />
        </section>
        
        {/* Instagram Gallery */}
        <section className="mx-2 py-8 sm:py-12 lg:py-16 touch-spacing">
          <InstagramGallery />
        </section>
      </main>
      
      
    </div>
  );
}
    