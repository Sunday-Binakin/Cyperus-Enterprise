'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './BlogSection.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Blog data
const blogPosts = [
  {
    id: 1,
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Health & Wellness",
    title: "The Health Benefits of Tigernut Milk",
    description: "Discover why tigernut milk is becoming a popular dairy-free alternative...",
    categoryColor: "#4A651F"
  },
  {
    id: 2,
    image: "/images/clients/products/footer/lemon-grass.jpg",
    category: "Recipes",
    title: "5 Delicious Ways to Use Tigernut Flour",
    description: "Explore creative recipes and cooking tips using our premium tigernut flour.",
    categoryColor: "#4A651F"
  },
  {
    id: 3,
    image: "/images/clients/products/footer/choconut.jpg",
    category: "Sustainability",
    title: "The Future of Sustainable Farming",
    description: "How tigernut farming is helping communities and the environment...",
    categoryColor: "#059669"
  }
];

// Blog Card Component
const BlogCard = ({ post, className = "" }: { post: typeof blogPosts[0], className?: string }) => (
  <div className={`bg-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
    <div className="relative h-96">
      <Image 
        src={post.image}
        alt={post.title}
        fill
        className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <span 
          className="text-white text-xs px-3 py-1 rounded-full self-start mb-3" 
          style={{backgroundColor: post.categoryColor}}
        >
          {post.category}
        </span>
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-300 mb-4">{post.description}</p>
        <div className="flex items-center">
          <span className="text-sm text-gray-400">Read More</span>
          <svg className="w-4 h-4 ml-2" style={{color: '#4A651F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default function BlogSection() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-white mb-2">OUR LATEST BLOG & NEWS</h2>
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated with Our Stories</h3>
          <div className="w-20 h-1" style={{backgroundColor: '#4A651F'}}></div>
        </div>
        
        {/* Mobile Carousel View */}
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
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className={`blog-swiper ${styles.blogSwiper}`}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
            }}
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard 
                  post={post} 
                  className="w-full lg:transform lg:-translate-y-4" 
                />
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Arrows */}
            <div className={`swiper-button-prev-custom ${styles.swiperButtonPrevCustom}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className={`swiper-button-next-custom ${styles.swiperButtonNextCustom}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Swiper>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              className="lg:transform lg:-translate-y-4" 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center px-8 py-3 text-white rounded-full font-medium transition-colors" style={{backgroundColor: '#4A651F'}}>
            VIEW ALL ARTICLES
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
