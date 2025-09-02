'use server';

import { Resend } from 'resend';
import DistributorInquiryEmail from '@/app/components/emails/DistributorInquiryEmail';

export interface DistributorFormData {
  fullName: string;
  companyName: string;
  countryCity: string;
  email: string;
  phone: string;
  businessType: string;
  businessYears: string;
  currentlyDistributing: string;
  currentBrands?: string;
  interestedProducts: string[];
  monthlyQuantity?: string;
  packagingPreference: string;
  importExperience: string;
  shippingMethod?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDistributorInquiryEmail = async (formData: DistributorFormData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Cyperus Website <onboarding@resend.dev>',
      to: ['sundaydev4@gmail.com'], // Your email address
      subject: `New Distributor Inquiry: ${formData.companyName}`,
      react: DistributorInquiryEmail({ formData }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send email.' };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Inquiry sent successfully!' };
  } catch (exception) {
    console.error('Exception sending email:', exception);
    return { success: false, message: 'An unexpected error occurred.' };
  }
};
