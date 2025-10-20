'use client';

import React, { useRef, useEffect } from 'react';

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Monthly Plan',
    price: '$19.99/month',
    description: 'Perfect for trying out our service',
    features: [
      'Free shipping',
      '10% discount on all products',
      'Flexible delivery schedule',
      'Cancel anytime'
    ]
  },
  {
    name: 'Quarterly Plan',
    price: '$49.99/quarter',
    description: 'Great value with extra savings',
    features: [
      'Everything in Monthly',
      '15% discount on all products',
      'Priority customer support',
      'Free samples with each delivery'
    ],
    popular: true
  },
  {
    name: 'Annual Plan',
    price: '$179.99/year',
    description: 'Best value with maximum savings',
    features: [
      'Everything in Quarterly',
      '20% discount on all products',
      'VIP customer support',
      'Free gift on signup',
      'Early access to new products'
    ]
  }
];

export function SubscriptionPlans() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full py-20 bg-gray-50">
      {/* Parallax Background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 -z-10 h-[120%] w-full"
        style={{
          backgroundImage: 'url(/images/clients/hero/slider2.PNG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          willChange: 'transform',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the subscription that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:scale-105 border border-white/10 ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-white mb-4">{plan.price}</p>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                onClick={() => {
                  // Scroll to contact form or open modal
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
