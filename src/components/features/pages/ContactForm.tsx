'use client';

import { FaArrowRight } from 'react-icons/fa';
import { sendContactInquiryEmail } from '@/app/actions/sendContactInquiry';
import { toast } from 'sonner';
import { useForm } from '@/hooks/useForm';
import { FormInput, FormTextArea, FormButton } from '@/components/ui/form';

const ContactForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: ''
    },
    onSubmit: async (values) => {
      const result = await sendContactInquiryEmail(values);
      return result;
    },
    onSuccess: () => {
      toast.success('Thank you for your message! We will get back to you soon.');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.';
      toast.error(errorMessage);
    }
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-8 rounded-lg">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">Interested in discussing?</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
            variant="dark"
          />
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
            variant="dark"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter Subject"
            required
            variant="dark"
          />
          <FormInput
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone"
            required
            variant="dark"
          />
        </div>
        
        <FormTextArea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter Message"
          rows={6}
          required
          variant="dark"
        />
        
        <div className="flex justify-center">
          <FormButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Sending..."
            variant="primary"
            icon={<FaArrowRight />}
            className="text-lg w-full max-w-xs mx-auto"
          >
            Send your message
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
