"use client";
import React from 'react'
import Image from 'next/image'

export const WhyCyperus = () => {
    return (
        <div className='bg-black'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
                {/* Mobile-first responsive layout */}
                <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12'>
                    {/* Content Section - Mobile first, then desktop */}
                    <div className='w-full lg:w-1/2 text-white order-2 lg:order-1'>
                        <div className='space-y-4 sm:space-y-6'>
                            <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-[#EFE554] text-center lg:text-left'>
                                About Us – Cyperus Enterprise
                            </h2>
                        </div>
                        
                        {/* Responsive text content */}
                        <div className='space-y-4 mt-6 sm:mt-8'>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                At Cyperus Enterprise, we are passionate about exploring the endless possibilities of tigernut. Our mission is to create high-quality, healthy products while supporting local farmers and communities. Our vision is to become a leading innovator in tigernut-based foods and beverages, serving both the local and export markets.
                            </p>
                            
                            <p className='text-sm sm:text-base lg:text-lg text-white font-semibold text-center lg:text-left'>
                                We currently produce and export:
                            </p>
                            
                            <div className='space-y-3 pl-4'>
                                <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                    <span className='text-[#EFE554] font-semibold'>Beverages</span> – refreshing, natural, and full of goodness.
                                </p>
                                <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                    <span className='text-[#EFE554] font-semibold'>Raw Tigernut</span> – available in black, brown, and golden dark brown varieties for both local and international markets.
                                </p>
                                <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                    <span className='text-[#EFE554] font-semibold'>Poultry Feed</span> – nutritious by-products to support livestock farmers.
                                </p>
                            </div>
                            
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                By harnessing the potential of tigernut, we aim to bring health, innovation, and economic growth to the communities we work with, while delivering quality products that customers love around the world.
                            </p>
                        </div>
                    </div>
                    
                    {/* Image Section - Responsive sizing */}
                    <div className='w-full lg:w-1/2 order-1 lg:order-2'>
                        <div className='relative aspect-square sm:aspect-[4/3] lg:aspect-square max-w-md mx-auto lg:max-w-none'>
                            <Image 
                                src="/images/clients/hero/slider1.JPG" 
                                alt="Cyperus Enterprise"
                                fill
                                className="object-cover rounded-lg shadow-lg"
                                priority
                                quality={85}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
