'use client';

import { Toaster } from 'sonner';
import HeroSection from '../../components/clients/export-with-us/HeroSection';
import OfferSection from '../../components/clients/export-with-us/OfferSection';
import WhyChooseUsSection from '../../components/clients/export-with-us/WhyChooseUsSection';
import InquiryForm from '../../components/clients/export-with-us/InquiryForm';
import ContactCTASection from '../../components/clients/export-with-us/ContactCTASection';

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
