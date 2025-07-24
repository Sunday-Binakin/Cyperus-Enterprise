import React from 'react'
import Image from 'next/image'

export const MeetOurCeo = () => {
    return (
        <div className='bg-black'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
                {/* Header Section */}
                <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
                    <p className='text-lg sm:text-xl lg:text-2xl font-bold text-yellow-500 mb-2 sm:mb-4'>
                        THE TIGERNUT-WIZ
                    </p>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight'>
                        Meet The Brain Behind Cyperus Enterprise
                    </h2>
                </div>
                
                {/* Content Section - Mobile-first responsive layout */}
                <div className='flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16'>
                    {/* Image Section */}
                    <div className='w-full lg:w-2/5 order-1 lg:order-1'>
                        <div className='relative aspect-[3/4] max-w-md mx-auto lg:max-w-none'>
                            <Image 
                                src="/images/clients/hero/slider1.JPG" 
                                alt="CEO of Cyperus Enterprise" 
                                fill
                                className="object-cover rounded-lg shadow-lg" 
                                priority
                                quality={85}
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                            />
                        </div>
                    </div>
                    
                    {/* Text Content Section */}
                    <div className='w-full lg:w-3/5 text-white order-2 lg:order-2'>
                        <div className='space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed'>
                            <p className='text-center lg:text-left'>
                                Our CEO, Temitope Oriola, graduated from the University of Lagos, Akoka BSC. Banking and Finance with Second Class Upper in 2007, she has a Diploma in Finance and second level of ACCA.
                            </p>             
                            <p className='text-center lg:text-left'>
                                She was a Financial Advisor who resigned as an Associate with one of the leading Investment Banking firms in Lagos, Nigeria after 9 years of service in 2019.
                            </p>
                            <p className='text-center lg:text-left'>
                                With intense passion for cooking, continuous research and quest to learn complex dishes, she stumbled across Tigernut milk on YouTube in February 2017. After making Tigernut milk, the curious part of her felt that the chaff from the milk couldn&apos;t be ignored.
                            </p>
                            <p className='text-center lg:text-left'>
                                Through extensive research, she realized Tigernut wasn&apos;t just good for milk but is currently 1 of the top 10 Super foods in the world, perfect for diabetics, weight watchers, good guts, fertility, heart and general wellness.
                            </p>
                            <p className='text-center lg:text-left'>
                                That was the start of Behealthyng now TIGERNUTS REPUBLIC first in her thoughts, her kitchen, amongst family/friends and to the world. It can simply be said that &apos;Her passion for cooking led her to the discovery of the wonders of Tigernut&rdquo;.
                            </p>
                            <p className='text-center lg:text-left'>
                                She incorporated her company in May 2017, an indigenous company with 100% focus on Tigernut.
                            </p>
                            <p className='text-center lg:text-left'>
                                This is an endless journey of continuous research, improvements and addition to the existing Tigernut range of products from Tigernuts Republic till Tigernuts Republic becomes a household name Globally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
