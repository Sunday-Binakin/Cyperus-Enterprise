"use client";

import React from 'react';

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: "🌿",
      title: "Farm-to-factory sourcing"
    },
    {
      icon: "🧴",
      title: "Attractive retail-ready packaging"
    },
    {
      icon: "📦",
      title: "Flexible bulk ordering & private labeling options"
    },
    {
      icon: "🚚",
      title: "Reliable shipping from Ghana to your destination"
    }
  ];

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] text-center mb-12">
          Why Choose Us?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EFE554] transition-colors duration-300"
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
