'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Search, Filter } from 'lucide-react';

// Blog data (same as individual blog post page)
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
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/images/clients/team/author1.jpg",
      bio: "Nutritionist and wellness expert with 10+ years of experience in natural health."
    },
    tags: ["nutrition", "health", "dairy-free", "wellness"],
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
    author: {
      name: "Chef Maria Rodriguez",
      avatar: "/images/clients/team/author2.jpg",
      bio: "Professional chef specializing in healthy, plant-based cuisine."
    },
    tags: ["recipes", "baking", "gluten-free", "cooking"],
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
    author: {
      name: "Prof. Michael Green",
      avatar: "/images/clients/team/author3.jpg",
      bio: "Agricultural scientist and sustainability researcher."
    },
    tags: ["sustainability", "farming", "environment", "community"],
    categoryColor: "#059669"
  },
  {
    id: 4,
    slug: 'tigernut-smoothie-recipes',
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Recipes",
    title: "Ultimate Tigernut Smoothie Recipes",
    description: "Delicious and nutritious smoothie recipes featuring tigernut milk and flour for energy and health.",
    excerpt: "Start your day right with these power-packed tigernut smoothies that fuel your body naturally.",
    readTime: 4,
    publishedAt: "2024-01-20",
    author: {
      name: "Chef Maria Rodriguez",
      avatar: "/images/clients/team/author2.jpg",
      bio: "Professional chef specializing in healthy, plant-based cuisine."
    },
    tags: ["smoothies", "recipes", "breakfast", "energy"],
    categoryColor: "#4A651F"
  },
  {
    id: 5,
    slug: 'tigernut-benefits-athletes',
    image: "/images/clients/products/footer/lemon-grass.jpg",
    category: "Health & Wellness",
    title: "Why Athletes Love Tigernuts",
    description: "Discover how tigernuts provide natural energy and recovery benefits for athletic performance.",
    excerpt: "Learn why professional athletes are turning to tigernuts for natural performance enhancement.",
    readTime: 7,
    publishedAt: "2024-01-12",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/images/clients/team/author1.jpg",
      bio: "Nutritionist and wellness expert with 10+ years of experience in natural health."
    },
    tags: ["athletics", "performance", "energy", "recovery"],
    categoryColor: "#4A651F"
  },
  {
    id: 6,
    slug: 'sustainable-tigernut-farming-africa',
    image: "/images/clients/products/footer/choconut.jpg",
    category: "Sustainability",
    title: "Tigernut Farming in Africa: A Success Story",
    description: "How tigernut cultivation is transforming rural communities across Africa through sustainable practices.",
    excerpt: "Explore the positive impact of tigernut farming on African communities and the environment.",
    readTime: 9,
    publishedAt: "2024-01-08",
    author: {
      name: "Prof. Michael Green",
      avatar: "/images/clients/team/author3.jpg",
      bio: "Agricultural scientist and sustainability researcher."
    },
    tags: ["africa", "community", "farming", "success"],
    categoryColor: "#059669"
  }
];

const categories = ["All", "Health & Wellness", "Recipes", "Sustainability"];

export default function AllBlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">All Blog Posts</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-400"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1); // Reset to first page when filtering
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-400">
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {paginatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <span 
                      className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded"
                      style={{ backgroundColor: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold group-hover:text-yellow-400 transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime} min
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setCurrentPage(1);
              }}
              className="mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
