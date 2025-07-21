import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogSection() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-white mb-2">OUR LATEST BLOG & NEWS</h2>
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated with Our Stories</h3>
          <div className="w-20 h-1" style={{backgroundColor: '#4A651F'}}></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Left Panel */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl lg:transform lg:-translate-y-4">
            <div className="relative h-96">
              <Image 
                src="/images/clients/products/footer/ginger.jpg"
                alt="Ginger"
                layout="fill"
                objectFit="cover"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <span className="text-white text-xs px-3 py-1 rounded-full self-start mb-3" style={{backgroundColor: '#4A651F'}}>Health & Wellness</span>
                <h3 className="text-2xl font-bold mb-2">The Health Benefits of Tigernut Milk</h3>
                <p className="text-gray-300 mb-4">Discover why tigernut milk is becoming a popular dairy-free alternative...</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Read More</span>
                  <svg className="w-4 h-4 ml-2" style={{color: '#4A651F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Main Feature */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl lg:transform lg:-translate-y-4">
            <div className="relative h-96">
              <Image 
                src="/images/clients/products/footer/lemon-grass.jpg"
                alt="Lemon Grass"
                layout="fill"
                objectFit="cover"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <span className="text-white text-xs px-3 py-1 rounded-full self-start mb-3" style={{backgroundColor: '#4A651F'}}>Recipes</span>
                <h3 className="text-2xl font-bold mb-2">5 Delicious Ways to Use Tigernut Flour</h3>
                <p className="text-gray-300 mb-4">Explore creative recipes and cooking tips using our premium tigernut flour.</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Read More</span>
                  <svg className="w-4 h-4 ml-2" style={{color: '#4A651F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl lg:transform lg:-translate-y-4">
            <div className="relative h-96">
              <Image 
                src="/images/clients/products/footer/choconut.jpg"
                alt="Choconut"
                layout="fill"
                objectFit="cover"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full self-start mb-3">Sustainability</span>
                <h3 className="text-2xl font-bold mb-2">The Future of Sustainable Farming</h3>
                <p className="text-gray-300 mb-4">How tigernut farming is helping communities and the environment...</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Read More</span>
                  <svg className="w-4 h-4 ml-2" style={{color: '#4A651F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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
