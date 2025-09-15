"use client";

import React from 'react';

export default function ExportOfferingsSection() {
  const offerings = [
    {
      icon: "✅",
      title: "Tigernut Beverages",
      description: "Vegan-friendly, dairy-free, and nutrient-rich"
    },
    {
      icon: "✅",
      title: "Tigernut Snacks & Popsicles",
      description: "Tasty, natural alternatives to sugary treats"
    },
    {
      icon: "✅",
      title: "Tigernut Pulp Flour & Poultry Feed",
      description: "Clean, value-added by-products for baking and farming"
    }
  ];

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] text-center mb-12">
          What We Offer for Export
        </h2>
        
        <div className="grid md:grid-cols-1 gap-8">
          {offerings.map((offering, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EFE554] transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <span className="text-2xl">{offering.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#EFE554] mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {offering.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
