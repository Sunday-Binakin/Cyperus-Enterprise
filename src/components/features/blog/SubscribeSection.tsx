import React from 'react';
import { FiMail } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';

const SubscribeSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Very light overlay for minimal contrast while showing parallax */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-none z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-2xl shadow-black">
            Stay Updated With Our Latest News
          </h2>
          <p className="text-white/95 mb-8 text-lg font-medium drop-shadow-xl shadow-black">
            Subscribe to our newsletter and never miss our latest updates, news, and special offers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3.5 bg-white/20 backdrop-blur-md text-white rounded-lg border-2 border-white/30 focus:border-[#EFE554] focus:outline-none transition-colors duration-200
                          placeholder-gray-200 hover:border-[#EFE554]/70 focus:bg-white/30 shadow-xl"
                placeholder="Your email address"
                aria-label="Email subscription"
                required
              />
            </div>
            <button
              type="button"
              className="flex items-center px-6 py-3 bg-[#EFE554] hover:bg-[#55006F] hover:text-white text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 shadow-2xl"
            >
              Subscribe Now
              <FaArrowRight className="ml-2 -mr-1 w-4 h-4" />
            </button>
          </div>
          
          <p className="mt-4 text-sm text-gray-100 drop-shadow-lg shadow-black">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
