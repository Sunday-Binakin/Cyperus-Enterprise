"use client";

import React from 'react';
import { HeroSection } from '@/app/components/shared/HeroSection';
import { WhyCyperus } from '@/app/components/clients/about-us/WhyCyperus';
import { PeopleMayAsk } from '@/app/components/clients/about-us/PeopleMayAsk';
import OurStats from '@/app/components/clients/about-us/OurStats';
import { MeetOurCeo } from '@/app/components/clients/about-us/MeetOurCeo';
import InstagramGallery from '@/app/components/clients/contact-us/InstagramGallery';
import Testimonials from '@/app/components/clients/Landing-Page/TestimonialsSection';
import Footer from '@/app/components/clients/Footer';
import '@/app/components/clients/about-us/responsive.css';


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
        <section className="mx-2 py-8 sm:py-12 lg:py-16">
          <MeetOurCeo />
        </section>
        
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
    