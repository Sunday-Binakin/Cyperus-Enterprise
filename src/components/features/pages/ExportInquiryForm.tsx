"use client";

import { toast } from 'sonner';
import { sendExportInquiryEmail } from '@/app/actions/sendExportInquiry';
import { useForm } from '@/hooks/useForm';
import { FormInput, FormSelect, FormCheckbox, FormTextArea, FormButton } from '@/components/ui/form';

const productOptions = [
  'Tigernut Beverages',
  'Tigernut Snacks & Popsicles',
  'Tigernut Pulp Flour',
  'Poultry Feed'
];

const businessTypes = [
  'Distributor',
  'Wholesaler',
  'Retailer',
  'Food Service',
  'Other'
];

export default function ExportInquiryForm() {
  const { formData, isSubmitting, handleChange, handleCheckboxChange, handleSubmit } = useForm({
    initialValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      businessType: '',
      productsInterested: [] as string[],
      orderQuantity: '',
      additionalInfo: ''
    },
    onSubmit: async (values) => {
      const result = await sendExportInquiryEmail(values);
      return result;
    },
    onSuccess: () => {
      toast.success('Thank you for your inquiry! We will contact you soon.');
    },
    onError: (error) => {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.';
      toast.error(errorMessage);
    }
  });

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] text-center mb-12">
          Export Inquiry Form
        </h2>
        
        <div className="bg-black rounded-lg p-8 border border-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                required
                variant="light"
              />
              
              <FormInput
                type="text"
                id="contactPerson"
                name="contactPerson"
                label="Contact Person"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Full name"
                required
                variant="light"
              />
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                type="email"
                id="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@company.com"
                required
                variant="light"
              />
              
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                variant="light"
              />
            </div>

            {/* Business Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                id="country"
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Your country"
                required
                variant="light"
              />
              
              <FormSelect
                id="businessType"
                name="businessType"
                label="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                options={businessTypes}
                placeholder="Select business type"
                required
                variant="light"
              />
            </div>

            {/* Products Interested */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Products Interested In <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {productOptions.map((product) => (
                  <FormCheckbox
                    key={product}
                    label={product}
                    checked={formData.productsInterested.includes(product)}
                    onChange={() => handleCheckboxChange('productsInterested', product)}
                  />
                ))}
              </div>
            </div>

            {/* Order Quantity */}
            <FormInput
              type="text"
              id="orderQuantity"
              name="orderQuantity"
              label="Estimated Order Quantity"
              value={formData.orderQuantity}
              onChange={handleChange}
              placeholder="e.g., 1000 units per month"
              variant="light"
            />

            {/* Additional Information */}
            <FormTextArea
              id="additionalInfo"
              name="additionalInfo"
              label="Additional Information"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us more about your requirements, target markets, or any specific questions..."
              variant="light"
            />

            {/* Submit Button */}
            <div className="text-center">
              <FormButton
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting..."
                variant="secondary"
                className="min-w-[200px]"
              >
                Submit Export Inquiry
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
