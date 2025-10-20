'use client';

import { toast } from 'sonner';
import { useForm } from '@/hooks/useForm';
import { FormInput, FormSelect, FormCheckbox, FormTextArea, FormButton } from '@/components/ui/form';

// Mock inquiry service for client-side form handling
class MockInquiryService {
  async submitInquiry(inquiryData: Record<string, unknown>) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the inquiry (in a real app, this would be saved to a database)
    console.log('New inquiry submitted:', inquiryData);
    
    // Simulate successful submission
    return {
      success: true,
      message: 'Inquiry submitted successfully',
      id: `inquiry_${Date.now()}`
    };
  }
}

const mockInquiryService = new MockInquiryService();

// Countries list for dropdown
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Japan', 'South Korea', 'China', 'India', 'Brazil', 'Mexico',
  'South Africa', 'Nigeria', 'Kenya', 'Other'
];

const productInterests = [
  { id: 'beverages', label: 'Tigernut Beverages' },
  { id: 'snacks', label: 'Snacks & Popsicles' },
  { id: 'flour', label: 'Pulp Flour' },
  { id: 'other', label: 'Other Products' }
];

export default function InquiryForm() {
  const { formData, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: '',
      company: '',
      email: '',
      country: '',
      beverages: false,
      snacks: false,
      flour: false,
      other: false,
      message: '',
      newsletter: false,
    },
    onSubmit: async (values) => {
      // Convert checkbox values to interests array
      const selectedInterests = productInterests
        .filter(product => values[product.id as keyof typeof values])
        .map(product => product.id);

      const result = await mockInquiryService.submitInquiry({
        name: values.name,
        company: values.company,
        email: values.email,
        country: values.country,
        interests: selectedInterests,
        message: values.message,
        newsletter_subscription: values.newsletter,
        submitted_at: new Date().toISOString(),
      });

      return result;
    },
    onSuccess: () => {
      toast.success("Thank you! We'll contact you within 24 hours.");
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  });

  return (
    <section id="inquiry-form" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white font-serif mb-12">
            Become a Distributor
          </h2>
          
          <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-xl border border-gray-800">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <FormInput
                type="text"
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="white"
              />
              
              <FormInput
                type="text"
                id="company"
                name="company"
                label="Company"
                value={formData.company}
                onChange={handleChange}
                required
                variant="white"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <FormInput
                type="email"
                id="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                variant="white"
              />
              
              <FormSelect
                id="country"
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleChange}
                options={countries}
                placeholder="Select your country"
                required
                variant="white"
              />
            </div>
            
            <div className="mb-6">
              <span className="block text-white font-medium mb-2">Products of Interest</span>
              <div className="grid grid-cols-2 gap-4">
                {productInterests.map((product) => (
                  <FormCheckbox
                    key={product.id}
                    id={product.id}
                    name={product.id}
                    label={product.label}
                    checked={formData[product.id as keyof typeof formData] as boolean}
                    onChange={handleChange}
                    variant="accent"
                  />
                ))}
              </div>
            </div>
            
            <FormTextArea
              id="message"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about your business and specific requirements..."
              variant="white"
              containerClassName="mb-6"
            />
            
            <FormCheckbox
              id="newsletter"
              name="newsletter"
              label="Subscribe to our newsletter for updates on market trends and opportunities"
              checked={formData.newsletter}
              onChange={handleChange}
              variant="accent"
              containerClassName="mb-6"
            />
            
            <FormButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              variant="yellow"
              className="w-full py-4 text-lg"
            >
              Submit Inquiry
            </FormButton>
          </form>
        </div>
      </div>
    </section>
  );
}
