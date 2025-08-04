import React, { useState } from 'react';
import { toast } from 'sonner';

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

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    interests: {
      beverages: false,
      snacks: false,
      flour: false,
      other: false,
    },
    message: '',
    newsletter: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name === 'newsletter') {
      setFormData(prev => ({
        ...prev,
        newsletter: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          [name]: checked,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Convert interests object to array of selected interests
      const selectedInterests = Object.entries(formData.interests)
        .filter(([, isSelected]) => isSelected)
        .map(([interest]) => interest);

      // Submit using mock service
      const result = await mockInquiryService.submitInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        country: formData.country,
        interests: selectedInterests,
        message: formData.message,
        newsletter_subscription: formData.newsletter,
        submitted_at: new Date().toISOString(),
      });

      if (!result.success) throw new Error(result.message);

      toast.success("Thank you! We'll contact you within 24 hours.");
      
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        country: '',
        interests: {
          beverages: false,
          snacks: false,
          flour: false,
          other: false,
        },
        message: '',
        newsletter: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white font-serif mb-12">Become a Distributor</h2>
          
          <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-xl border border-gray-800">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-white font-medium mb-2">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-white font-medium mb-2">Country</label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="block text-white font-medium mb-2">Products of Interest</span>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="beverages"
                    name="beverages"
                    checked={formData.interests.beverages}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#EFE554]"
                  />
                  <label htmlFor="beverages" className="ml-2 text-white">Tigernut Beverages</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="snacks"
                    name="snacks"
                    checked={formData.interests.snacks}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#EFE554]"
                  />
                  <label htmlFor="snacks" className="ml-2 text-white">Snacks & Popsicles</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="flour"
                    name="flour"
                    checked={formData.interests.flour}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#EFE554]"
                  />
                  <label htmlFor="flour" className="ml-2 text-white">Pulp Flour</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="other"
                    name="other"
                    checked={formData.interests.other}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-[#EFE554]"
                  />
                  <label htmlFor="other" className="ml-2 text-white">Other Products</label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
                placeholder="Tell us about your business and specific requirements..."
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 accent-[#EFE554]"
                />
                <label htmlFor="newsletter" className="ml-2 text-white">
                  Subscribe to our newsletter for updates on market trends and opportunities
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#EFE554] text-black py-4 rounded-md text-lg font-bold hover:bg-[#d5cc49] transition-colors duration-300 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
