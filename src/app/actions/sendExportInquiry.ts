'use server';

import { Resend } from 'resend';
import ExportInquiryEmail from '@/app/components/emails/ExportInquiryEmail';

export interface ExportFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  productsInterested: string[];
  orderQuantity: string;
  additionalInfo: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendExportInquiryEmail = async (formData: ExportFormData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Cyperus Export Department <onboarding@resend.dev>',
      to: ['estherjohnson@gmail.com'],
      replyTo: formData.email,
      subject: `New Export Inquiry: ${formData.companyName}`,
      react: ExportInquiryEmail({ formData }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send email.' };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Export inquiry sent successfully!' };
  } catch (exception) {
    console.error('Exception sending email:', exception);
    return { success: false, message: 'An unexpected error occurred.' };
  }
};