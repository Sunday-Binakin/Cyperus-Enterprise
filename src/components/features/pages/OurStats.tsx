 'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatItemProps {
  value: string;
  title: string;
  description: string;
}

const StatItem = ({ value, title, description }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-center text-center px-4 sm:px-6 py-6 sm:py-8 lg:py-10"
      style={{
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)"
      }}
    >
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-500 mb-2 sm:mb-3">
        {count}{value.includes('+') ? '+' : ''}
      </span>
      <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-400 text-xs sm:text-sm lg:text-base">{description}</p>
    </div>
  );
};

const OurStats = () => {
  const stats = [
    {
      value: '226+',
      title: 'Retail Locations',
      description: 'Where to find us'
    },
    {
      value: '50+',
      title: 'Product Variants',
      description: 'Browse our variants'
    },
    {
      value: '20000+',
      title: 'Sold',
      description: 'Fast selling'
    }
  ];

  return (
    <section className="bg-black py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStats;
