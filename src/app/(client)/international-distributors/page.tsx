'use client';
import { useState } from 'react';
import { HeroSection } from '@/app/components/clients/contact-us/HeroSection';
import { sendDistributorInquiryEmail } from '@/app/actions/sendDistributorInquiry';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function InternationalDistributorsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    countryCity: '',
    email: '',
    phone: '',
    businessType: '',
    businessYears: '',
    currentlyDistributing: '',
    currentBrands: '',
    interestedProducts: [] as string[],
    monthlyQuantity: '',
    packagingPreference: '',
    importExperience: '',
    shippingMethod: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'interestedProducts') {
      setFormData(prev => ({
        ...prev,
        interestedProducts: checked 
          ? [...prev.interestedProducts, value]
          : prev.interestedProducts.filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (formData.interestedProducts.length === 0) {
      toast.error('Please select at least one product you are interested in.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendDistributorInquiryEmail(formData);

      if (result.success) {
        toast.success('Thank you for your inquiry! We will contact you soon.');
        // Optionally reset the form
        setFormData({
          fullName: '',
          companyName: '',
          countryCity: '',
          email: '',
          phone: '',
          businessType: '',
          businessYears: '',
          currentlyDistributing: '',
          currentBrands: '',
          interestedProducts: [],
          monthlyQuantity: '',
          packagingPreference: '',
          importExperience: '',
          shippingMethod: ''
        });
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeroSection 
              title="International Distributors" 
              breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'International Distributors', href: '/international-distributors' }
              ]} 
              backgroundImage={'/images/clients/products/footer/choconut.jpg'} />

      <div className="bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-black rounded-lg shadow-lg p-8 md:p-12">
          {/* <div className="bg-white rounded-lg shadow-lg p-8 md:p-12"> */}
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🌍 International Distributors
              </h1>
              <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-6">
                Help us take Ghana&apos;s finest tigernut products global.
                Bulk orders, export-ready packaging, and great margins await.
              </p>
              
              <div className="bg-[#4A651F] rounded-lg p-6 inline-block">
                <p className="text-white text-lg font-medium">
                  📧 Email us or fill our export form to partner with us
                </p>
                <a 
                  href="mailto:exports@cyperus.com" 
                  className="text-[#EFE554] hover:text-yellow-300 transition-colors underline"
                >
                  exports@cyperus.com
                </a>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Country & City *
                    </label>
                    <input
                      type="text"
                      name="countryCity"
                      value={formData.countryCity}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Nigeria, Lagos"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone Number (with country code) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., +234 123 456 7890"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Business Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Type of Business *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select business type</option>
                      <option value="retailer">Retailer</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="distributor">Distributor</option>
                      <option value="online-store">Online Store</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      How long have you been in business? *
                    </label>
                    <input
                      type="text"
                      name="businessYears"
                      value={formData.businessYears}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 5 years"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Do you currently distribute food or beverage products? *
                    </label>
                    <select
                      name="currentlyDistributing"
                      value={formData.currentlyDistributing}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  {formData.currentlyDistributing === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        If yes, which brands?
                      </label>
                      <textarea
                        name="currentBrands"
                        value={formData.currentBrands}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="List the brands you currently distribute..."
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Interest in Cyperus Products */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Interest in Cyperus Products</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-4">
                      Which of our products are you interested in? (Check all that apply) *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Beverages', 'Snacks', 'Flour', 'Popsicles', 'Poultry Feed'].map((product) => (
                        <label key={product} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="interestedProducts"
                            value={product.toLowerCase()}
                            checked={formData.interestedProducts.includes(product.toLowerCase())}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#4A651F] focus:ring-[#4A651F] border-gray-300 rounded"
                          />
                          <span className="text-white">{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Estimated monthly order quantity (if known)
                    </label>
                    <input
                      type="text"
                      name="monthlyQuantity"
                      value={formData.monthlyQuantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 1000 units"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Preferred packaging size *
                    </label>
                    <select
                      name="packagingPreference"
                      value={formData.packagingPreference}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select packaging preference</option>
                      <option value="retail-packs">Retail packs</option>
                      <option value="bulk">Bulk</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping & Logistics */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping & Logistics</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Do you have experience with importing goods? *
                    </label>
                    <select
                      name="importExperience"
                      value={formData.importExperience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Do you have a preferred shipping method or freight partner? (Optional)
                    </label>
                    <input
                      type="text"
                      name="shippingMethod"
                      value={formData.shippingMethod}
                      onChange={handleInputChange}
                      placeholder="e.g., DHL, FedEx, or specific freight company"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4A651F] text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-800 transition-colors duration-300 text-lg w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit International Distributor Inquiry'
                  )}
                </button>
                <p className="text-gray-600 mt-4">
                  We&apos;ll review your application and get back to you within 48 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}