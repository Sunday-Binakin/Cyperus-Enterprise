'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';

// Blog data (in a real app, this would come from a CMS or database)
const blogPosts = [
  {
    id: 1,
    slug: 'health-benefits-tigernut-milk',
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Health & Wellness",
    title: "The Health Benefits of Tigernut Milk",
    description: "Discover why tigernut milk is becoming a popular dairy-free alternative packed with nutrients and health benefits.",
    excerpt: "Explore the amazing nutritional profile of tigernut milk and how it can boost your health naturally.",
    content: `
      <h2>What Makes Tigernut Milk Special?</h2>
      <p>Tigernut milk has been gaining popularity as a nutritious, dairy-free alternative that offers numerous health benefits. This ancient superfood is packed with essential nutrients that support overall wellness.</p>
      
      <h3>Key Nutritional Benefits</h3>
      <ul>
        <li><strong>Rich in Fiber:</strong> Promotes digestive health and helps maintain stable blood sugar levels</li>
        <li><strong>High in Healthy Fats:</strong> Contains beneficial omega-3 and omega-6 fatty acids</li>
        <li><strong>Vitamin E:</strong> Powerful antioxidant that supports skin health and immune function</li>
        <li><strong>Minerals:</strong> Good source of potassium, magnesium, and iron</li>
      </ul>
      
      <h3>Health Benefits</h3>
      <p>Regular consumption of tigernut milk may help with:</p>
      <ul>
        <li>Improved digestive health</li>
        <li>Better heart health</li>
        <li>Enhanced immune function</li>
        <li>Stable blood sugar levels</li>
        <li>Increased energy levels</li>
      </ul>
      
      <h3>How to Incorporate Tigernut Milk</h3>
      <p>You can easily add tigernut milk to your diet by:</p>
      <ul>
        <li>Using it in smoothies and shakes</li>
        <li>Adding to cereals and oatmeal</li>
        <li>Using in baking recipes</li>
        <li>Drinking it as a refreshing beverage</li>
      </ul>
      
      <p>With its sweet, nutty flavor and impressive nutritional profile, tigernut milk is an excellent choice for anyone looking to improve their health naturally.</p>
    `,
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
    content: `
      <h2>Transform Your Baking with Tigernut Flour</h2>
      <p>Tigernut flour is a versatile, gluten-free alternative that adds a naturally sweet, nutty flavor to your favorite recipes. Here are five delicious ways to incorporate this superfood into your cooking.</p>
      
      <h3>1. Tigernut Flour Pancakes</h3>
      <p>Start your morning with fluffy, nutritious pancakes that are naturally sweet and satisfying.</p>
      <ul>
        <li>2 cups tigernut flour</li>
        <li>1 cup almond milk</li>
        <li>2 eggs</li>
        <li>1 tsp vanilla extract</li>
        <li>1 tsp baking powder</li>
      </ul>
      
      <h3>2. Chocolate Chip Cookies</h3>
      <p>Create guilt-free cookies that are both delicious and nutritious.</p>
      
      <h3>3. Bread and Muffins</h3>
      <p>Replace traditional flour with tigernut flour for a healthier twist on classic baked goods.</p>
      
      <h3>4. Energy Balls</h3>
      <p>Perfect for on-the-go snacking and post-workout fuel.</p>
      
      <h3>5. Pie Crusts</h3>
      <p>Create a naturally sweet, gluten-free pie crust that complements any filling.</p>
      
      <p>Each of these recipes showcases the versatility of tigernut flour while providing essential nutrients and natural sweetness to your favorite treats.</p>
    `,
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
    content: `
      <h2>Tigernuts: A Sustainable Solution</h2>
      <p>As the world faces increasing environmental challenges, tigernut farming emerges as a beacon of sustainable agriculture that benefits both communities and the planet.</p>
      
      <h3>Environmental Benefits</h3>
      <ul>
        <li><strong>Water Efficiency:</strong> Tigernuts require significantly less water than traditional crops</li>
        <li><strong>Soil Health:</strong> Helps prevent soil erosion and improves soil structure</li>
        <li><strong>Carbon Sequestration:</strong> Contributes to reducing atmospheric CO2</li>
        <li><strong>Biodiversity:</strong> Supports diverse ecosystems and wildlife habitats</li>
      </ul>
      
      <h3>Community Impact</h3>
      <p>Tigernut farming creates positive changes in rural communities:</p>
      <ul>
        <li>Provides sustainable income for farmers</li>
        <li>Creates job opportunities in processing and distribution</li>
        <li>Supports local economies</li>
        <li>Preserves traditional farming knowledge</li>
      </ul>
      
      <h3>The Future of Agriculture</h3>
      <p>As we look toward the future, tigernut farming represents a model for sustainable agriculture that can help address global food security while protecting our environment.</p>
    `,
    readTime: 6,
    publishedAt: "2024-01-05",
    author: {
      name: "Prof. Michael Green",
      avatar: "/images/clients/team/author3.jpg",
      bio: "Agricultural scientist and sustainability researcher."
    },
    tags: ["sustainability", "farming", "environment", "community"],
    categoryColor: "#059669"
  }
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            href="/blog"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <span 
              className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-4"
              style={{ backgroundColor: post.categoryColor }}
            >
              {post.category}
            </span>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <div 
            className="text-gray-300 leading-relaxed [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:ml-6 [&_li]:mb-2 [&_strong]:text-white [&_p]:mb-4 [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-900 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{post.author.name}</h3>
              <p className="text-gray-400 mt-1">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-900 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span 
                        className="inline-block px-2 py-1 text-xs font-semibold text-white rounded mb-2"
                        style={{ backgroundColor: relatedPost.categoryColor }}
                      >
                        {relatedPost.category}
                      </span>
                      <h3 className="font-semibold group-hover:text-yellow-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

