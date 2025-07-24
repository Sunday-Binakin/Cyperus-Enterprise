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
                                We are Cyperus Enterprise
                            </h2>
                            <h3 className='text-lg sm:text-xl lg:text-2xl text-white text-center lg:text-left'>
                                Our mission is to provide the best quality of life to our customers
                            </h3>
                        </div>
                        
                        {/* Responsive text content */}
                        <div className='space-y-4 mt-6 sm:mt-8'>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                Tigernuts Republic Nigeria, is a 100% subsidiary of O&apos;ZIBANA Limited Nigeria, a company registered in Nigeria on April 2017.
                            </p>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                Tigernuts Republic Nigeria, as the name connotes, is a one stop center for Tigernuts based products. We have since inception in March 2017 developed 21 variants of Tigernuts Milk and over 10 different food products from Tigernuts.
                            </p>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                This has been done with our focus solely on using Tigernuts in a very dynamic way, such that every household is able to relate with at least one of our various innovative, nutritious and healthy products.
                            </p>
                            <p className='text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left'>
                                Tigernuts Republic Nigeria won the ACE AWARDS for Best Foods Produce Innovation in April 2018 and over its years of operations have set a niche for herself in the Food and Beverage industry in Nigeria.
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
