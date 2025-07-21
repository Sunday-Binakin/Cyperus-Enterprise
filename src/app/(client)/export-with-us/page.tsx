'use client';

import { Toaster } from 'sonner';
import HeroSection from './components/HeroSection';
import OfferSection from './components/OfferSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import InquiryForm from './components/InquiryForm';
import ContactCTASection from './components/ContactCTASection';

export default function ExportWithUs() {
  return (
    <>
      <Toaster position="top-center" />
      <HeroSection />
      <OfferSection />
      <WhyChooseUsSection />
      <InquiryForm />
      <ContactCTASection />
    </>
  );
}
