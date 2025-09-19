"use client";

import React from 'react';

export default function PartnershipSection() {
  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] mb-8">
          Let&apos;s Partner
        </h2>
        
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            We&apos;re currently seeking international distributors, wholesalers, and retail partners.
          </p>
          
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
            <p className="text-lg text-white mb-4">
              👉 Contact us at{' '}
              <a 
                href="mailto:export@cyperusenterprise.com" 
                className="text-[#EFE554] hover:underline font-semibold"
              >
                export@cyperusenterprise.com
              </a>
              {' '}or fill out the export inquiry form below to start your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
