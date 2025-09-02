'use server';

import { Resend } from 'resend';
import ContactInquiryEmail from '@/app/components/emails/ContactInquiryEmail';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactInquiryEmail = async (formData: ContactFormData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Cyperus Contact Form <onboarding@resend.dev>',
      to: ['sundaydev4@gmail.com'], // Your email address
      replyTo: formData.email,
      subject: `New Contact Inquiry: ${formData.subject}`,
      react: ContactInquiryEmail({ formData }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send email.' };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Message sent successfully!' };
  } catch (exception) {
    console.error('Exception sending email:', exception);
    return { success: false, message: 'An unexpected error occurred.' };
  }
};
