'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';

// Define types for the props
interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface Post {
  id: number;
  slug: string;
  image: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  readTime: number;
  publishedAt: string;
  author: Author;
  tags: string[];
  categoryColor: string;
}

interface BlogPostPageClientProps {
  post: Post | undefined;
  relatedPosts: Post[];
}

export default function BlogPostPageClient({ post, relatedPosts }: BlogPostPageClientProps) {
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
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
            <span 
              className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-4"
              style={{ backgroundColor: post.categoryColor }}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
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

      {/* Content */}
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

        {/* Author */}
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
