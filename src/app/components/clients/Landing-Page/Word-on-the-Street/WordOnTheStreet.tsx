'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './WordOnTheStreet.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Testimonials data
const testimonials = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=400&h=400&fit=crop&crop=face",
    category: "Customer Story",
    name: "Akosua Mensah",
    role: "Health Enthusiast, Accra",
    quote: "Switching to tigernut milk has completely transformed my morning routine. My digestion improved and I feel more energetic throughout the day. It's creamy, delicious, and my kids love it too!",
    categoryColor: "#4A651F"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    category: "Chef Review",
    name: "Chef Kwame Asante",
    role: "Executive Chef, Five Star Hotel",
    quote: "Tigernut flour has become my secret ingredient. The nutty flavor and texture it brings to our pastries is absolutely incredible. Our guests constantly ask about our secret ingredient!",
    categoryColor: "#4A651F"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    category: "Fitness Journey",
    name: "Sarah Osei",
    role: "Fitness Trainer, Kumasi",
    quote: "My clients love the tigernut protein bars I recommend. It's natural, nutritious, and keeps them satisfied during workouts. Perfect for anyone on a health journey!",
    categoryColor: "#059669"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    category: "Family Wellness",
    name: "Mama Abena",
    role: "Mother of 3, Tamale",
    quote: "My children actually ask for tigernut milk now instead of regular milk. It's amazing how healthy eating can be this delicious. Even my picky eater loves it!",
    categoryColor: "#4A651F"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    category: "Business Owner",
    name: "Kofi Adjei",
    role: "Restaurant Owner, Cape Coast",
    quote: "Adding tigernut products to our menu was the best decision we made. Our customers love the unique taste and health benefits. Sales have increased significantly!",
    categoryColor: "#059669"
  }
];

// Testimonial Card Component - Identical structure to BlogCard
const TestimonialCard = ({ testimonial, className = "" }: { testimonial: typeof testimonials[0], className?: string }) => (
  <div className={`bg-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
    <div className="relative h-96">
      <Image 
        src={testimonial.image}
        alt={testimonial.name}
        fill
        className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <span 
          className="text-white text-xs px-3 py-1 rounded-full self-start mb-3" 
          style={{backgroundColor: testimonial.categoryColor}}
        >
          {testimonial.category}
        </span>
        <h3 className="text-2xl font-bold mb-2 line-clamp-2">{testimonial.name}</h3>
        <p className="text-sm text-[#EFE554] mb-2">{testimonial.role}</p>
        <p className="text-gray-300 mb-4 line-clamp-3 italic relative">
          <span className="text-[#EFE554] text-2xl absolute -top-2 -left-1">&ldquo;</span>
          <span className="ml-3">{testimonial.quote}</span>
          <span className="text-[#EFE554] text-2xl">&rdquo;</span>
        </p>
        <div className="flex items-center">
          <span className="text-sm text-gray-400">Read Testimonial</span>
          <svg className="w-4 h-4 ml-2" style={{color: '#4A651F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-white mb-2">TESTIMONIALS</h2>
          <h3 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h3>
          <div className="w-20 h-1" style={{backgroundColor: '#4A651F'}}></div>
        </div>
        
        {/* Mobile Carousel View - Identical to BlogSection */}
        <div className="lg:hidden mb-10">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom-testimonials',
              prevEl: '.swiper-button-prev-custom-testimonials',
            }}
            className={`testimonials-swiper ${styles.testimonialsSwiper}`}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard 
                  testimonial={testimonial} 
                  className="w-full lg:transform lg:-translate-y-4" 
                />
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Arrows */}
            <div className={`swiper-button-prev-custom-testimonials ${styles.swiperButtonPrevCustom}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className={`swiper-button-next-custom-testimonials ${styles.swiperButtonNextCustom}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Swiper>
        </div>

        {/* Desktop Grid View - Identical to BlogSection */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              className="lg:transform lg:-translate-y-4" 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/testimonials" className="inline-flex items-center px-8 py-3 text-white rounded-full font-medium transition-colors" style={{backgroundColor: '#4A651F'}}>
            VIEW ALL TESTIMONIALS
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
