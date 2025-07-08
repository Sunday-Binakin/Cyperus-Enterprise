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
      className="flex flex-col items-center text-center px-4 py-8"
      style={{
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)"
      }}
    >
      <span className="text-5xl md:text-6xl font-bold text-yellow-500 mb-2">
        {count}{value.includes('+') ? '+' : ''}
      </span>
      <h3 className="text-white text-xl font-medium mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
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
    <section className="bg-black py-12 md:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
