'use client';

import React from 'react';
import Image from 'next/image';
import { FaGoogle, FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    date: '2 weeks ago',
    rating: 5,
    review: 'Absolutely love Tigernuts! The milk is so creamy and delicious. I use it in my coffee every morning.',
    initial: 'S'
  },
  {
    id: 2,
    name: 'Michael T.',
    date: '1 month ago',
    rating: 5,
    review: 'Best dairy-free alternative I\'ve tried. The texture is perfect and it doesn\'t have that weird aftertaste.',
    initial: 'M'
  },
  {
    id: 3,
    name: 'Priya K.',
    date: '3 weeks ago',
    rating: 5,
    review: 'My kids love the taste and I love that it\'s packed with nutrients. Will definitely buy again!',
    initial: 'P'
  }
];

export default function Testimonials() {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-purple-300 mb-2">THE WORD ON THE STREET</h2>
          <h3 className="text-3xl font-bold">What Our Customers Are Saying</h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Google Logo and Stars */}
          <div className="flex flex-col items-center md:items-start md:w-1/4">
            <div className="  p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Image 
                src="/images/clients/google.jpg" 
                alt="Google" 
                width={100}
                height={30}
                className="mb-4"
              />
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              {/* <p className="text-gray-700 text-sm">5.0 Rating</p> */}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:w-3/4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-3  text-gray-800 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  <FaQuoteLeft className="text-purple-200 inline mr-2" />
                  {testimonial.review}
                </p>
                <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
