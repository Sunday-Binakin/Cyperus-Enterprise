'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Blog data
const blogPosts = [
  {
    id: 1,
    slug: 'health-benefits-tigernut-milk',
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Health & Wellness",
    title: "The Health Benefits of Tigernut Milk",
    description: "Discover why tigernut milk is becoming a popular dairy-free alternative packed with nutrients and health benefits.",
    excerpt: "Explore the amazing nutritional profile of tigernut milk and how it can boost your health naturally.",
    readTime: 5,
    publishedAt: "2024-01-15",
    categoryColor: "#4A651F"
  },
  {
    id: 2,
    slug: 'delicious-ways-tigernut-flour',
    image: "/images/clients/products/footer/lemon-grass.jpg",
    category: "Recipes",
    title: "5 Delicious Ways to Use Tigernut Flour",
    description: "Explore creative recipes and cooking tips using our premium tigernut flour for healthy baking.",
    excerpt: "Transform your baking with these innovative tigernut flour recipes that are both healthy and delicious.",
    readTime: 8,
    publishedAt: "2024-01-10",
    categoryColor: "#4A651F"
  },
  {
    id: 3,
    slug: 'future-sustainable-farming',
    image: "/images/clients/products/footer/choconut.jpg",
    category: "Sustainability",
    title: "The Future of Sustainable Farming",
    description: "How tigernut farming is helping communities and the environment through sustainable agricultural practices.",
    excerpt: "Learn how tigernut cultivation is revolutionizing sustainable farming and supporting local communities.",
    readTime: 6,
    publishedAt: "2024-01-05",
    categoryColor: "#059669"
  },
  {
    id: 4,
    slug: 'tigernut-nutrition-guide',
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Nutrition",
    title: "Complete Tigernut Nutrition Guide",
    description: "A comprehensive guide to the nutritional value and health benefits of tigernuts for your diet.",
    excerpt: "Everything you need to know about tigernut nutrition and how to incorporate them into your daily diet.",
    readTime: 7,
    publishedAt: "2024-01-01",
    categoryColor: "#7C3AED"
  }
];

// Blog Card Component
const BlogCard = ({ post, className = "" }: { post: typeof blogPosts[0], className?: string }) => (
  <div className={`bg-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
    <div className="relative h-64">
      <Image 
        src={post.image}
        alt={post.title}
        fill
        className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span 
          className="px-3 py-1 text-xs font-semibold text-white rounded-full"
          style={{ backgroundColor: post.categoryColor }}
        >
          {post.category}
        </span>
      </div>
      
      {/* Read Time */}
      <div className="absolute top-4 right-4">
        <span className="px-2 py-1 text-xs bg-black/50 text-white rounded">
          {post.readTime} min read
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 hover:text-yellow-400 transition-colors">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {post.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors font-medium text-sm"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

const BlogSection = () => {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay informed with our latest insights, tips, and stories about tigernuts and healthy living.
          </p>
        </div>

        {/* Mobile Swiper */}
        <div className="block lg:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            className="blog-swiper"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/blog/all"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-300"
          >
            View All Posts
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .blog-swiper .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5);
        }
        .blog-swiper .swiper-pagination-bullet-active {
          background-color: #EAB308;
        }
        .blog-swiper .swiper-button-next,
        .blog-swiper .swiper-button-prev {
          color: #EAB308;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
