"use client";

import React from 'react';
import { HeroSection } from '@/app/components/clients/about-us/HeroSection';
import { WhyCyperus } from '@/app/components/clients/about-us/WhyCyperus';
import { PeopleMayAsk } from '@/app/components/clients/about-us/PeopleMayAsk';
import OurStats from '@/app/components/clients/about-us/OurStats';
import { MeetOurCeo } from '@/app/components/clients/about-us/MeetOurCeo';
import InstagramGallery from '@/app/components/clients/contact-us/InstagramGallery';
import Testimonials from '@/app/components/clients/Landing-Page/Testimonials/Testimonials';


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
      <PeopleMayAsk/>
      <OurStats/>
      <MeetOurCeo/>
      <Testimonials/>
       <InstagramGallery/>
    </div>
  );
}
    