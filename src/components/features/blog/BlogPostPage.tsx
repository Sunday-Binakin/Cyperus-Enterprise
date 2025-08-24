'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { BlogPost, RelatedPost } from '@/app/types/blog';

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: RelatedPost[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, relatedPosts }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="mb-6">
            <span 
              className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full mb-4"
              style={{ backgroundColor: post.categoryColor }}
            >
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.description}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author.name}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center hover:text-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative h-64 md:h-80 lg:h-96 mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {/* Author Info */}
              <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                  <p className="text-sm text-gray-600">{post.author.bio}</p>
                </div>
              </div>
              
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-gray
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                         prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                         prose-ul:my-4 prose-li:my-1
                         prose-strong:text-gray-900 prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Table of Contents - You can implement this based on content headings */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Quick Info</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Read Time:</span>
                    <span className="font-medium">{post.readTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium">{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{post.category}</span>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-medium text-gray-900 mb-4">Share Article</h4>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-medium text-gray-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{relatedPost.readTime} min read</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostPage;
