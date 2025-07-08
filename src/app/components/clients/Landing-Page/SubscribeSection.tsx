import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function SubscribeSection() {
  return (
    <section className="relative py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="relative bg-black rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Panel */}
            <div className="lg:col-span-5 h-64 lg:h-auto relative">
              <Image
                src="/images/clients/products/footer/ginger.jpg"
                alt="Tigernut Products"
                layout="fill"
                objectFit="cover"
                className="opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50"></div>
            </div>
            
            {/* Center Form Panel */}
            <div className="lg:col-span-7 p-8 lg:p-12 bg-black">
              <div className="max-w-md mx-auto text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-300 mb-8">
                  Get the latest updates, news and product offers sent straight to your inbox.
                </p>
                
                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-600">
                  <h3 className="text-sm font-medium text-white mb-4">FOLLOW US</h3>
                  <div className="flex justify-center space-x-4">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                      <a
                        key={social}
                        href={`https://www.${social}.com/cyperusenterprise`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-purple-800 hover:text-purple-100 transition-colors"
                        aria-label={social}
                      >
                        <span className="sr-only">{social}</span>
                        {social === 'facebook' && <FaFacebook className="w-5 h-5" />}
                        {social === 'twitter' && <FaTwitter className="w-5 h-5" />}
                        {social === 'instagram' && <FaInstagram className="w-5 h-5" />}
                        {social === 'linkedin' && <FaLinkedin className="w-5 h-5" />}   
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Image Panel */}
            <div className="lg:col-span-5 h-64 lg:h-auto relative lg:order-last">
              <Image
                src="/images/clients/products/footer/choconut.jpg"
                alt="Tigernut Products"
                layout="fill"
                objectFit="cover"
                className="opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
