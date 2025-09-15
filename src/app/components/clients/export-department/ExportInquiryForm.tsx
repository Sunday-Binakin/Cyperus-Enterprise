"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';

export default function ExportInquiryForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    productsInterested: [] as string[],
    orderQuantity: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (product: string) => {
    setFormData(prev => ({
      ...prev,
      productsInterested: prev.productsInterested.includes(product)
        ? prev.productsInterested.filter(p => p !== product)
        : [...prev.productsInterested, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      toast.success('Export inquiry submitted successfully! We will contact you within 24 hours.');
      
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        businessType: '',
        productsInterested: [] as string[],
        orderQuantity: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-white mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                  placeholder="Full name"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                  placeholder="your.email@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            {/* Business Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                  placeholder="Your country"
                />
              </div>
              
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-white mb-2">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white"
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Interested */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Products Interested In *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {productOptions.map((product) => (
                  <label key={product} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.productsInterested.includes(product)}
                      onChange={() => handleCheckboxChange(product)}
                      className="w-4 h-4 text-white bg-black border border-white rounded focus:ring-white focus:ring-2"
                    />
                    <span className="text-white">{product}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Quantity */}
            <div>
              <label htmlFor="orderQuantity" className="block text-sm font-medium text-white mb-2">
                Estimated Order Quantity
              </label>
              <input
                type="text"
                id="orderQuantity"
                name="orderQuantity"
                value={formData.orderQuantity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                placeholder="e.g., 1000 units per month"
              />
            </div>

            {/* Additional Information */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-white mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-400"
                placeholder="Tell us more about your requirements, target markets, or any specific questions..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Export Inquiry'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
