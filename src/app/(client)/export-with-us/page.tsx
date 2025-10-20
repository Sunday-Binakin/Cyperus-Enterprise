'use client';

import { Toaster } from 'sonner';
import { HeroSection } from '@/components/features/pages/HeroSection';
import OfferSection from '@/components/features/pages/OfferSection';
import WhyChooseUsSection from '@/components/features/pages/WhyChooseUsSection';
import InquiryForm from '@/components/features/pages/InquiryForm';
import ContactCTASection from '@/components/features/pages/ContactCTASection';

export default function ExportWithUs() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Export With Us' },
  ];

  return (
    <>
      <Toaster position="top-center" />
      <HeroSection 
        title="Export With Us"
        backgroundImage="/images/clients/hero/slider1.JPG"
        breadcrumbItems={breadcrumbItems}
      />
      <OfferSection />
      <WhyChooseUsSection />
      <InquiryForm />
      <ContactCTASection />
    </>
  );
}
