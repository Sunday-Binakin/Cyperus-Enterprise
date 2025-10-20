import React from 'react'
import Image from 'next/image'

export const PeopleMayAsk = () => {
    return (
        <div className='bg-black'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
                {/* Header Section */}
                <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-[#EFE554] mb-2 sm:mb-4'>
                        PEOPLE ASK WHY TIGERNUTS?
                    </h2>
                    <p className='text-lg sm:text-xl lg:text-2xl text-white'>
                        Here&apos;s What Makes It Special
                    </p>
                </div>
                
                {/* Content Section - Mobile-first responsive layout */}
                <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16'>
                    {/* Image Section */}
                    <div className='w-full lg:w-1/2 order-1'>
                        <div className='relative aspect-square sm:aspect-[4/3] lg:aspect-square max-w-lg mx-auto lg:max-w-none'>
                            <Image
                                src="/images/clients/hero/slider1.JPG"
                                alt="Cyperus Enterprise"
                                fill
                                className="object-cover rounded-lg shadow-lg"
                                priority
                                quality={85}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                            />
                        </div>
                    </div>
                    
                    {/* Text Content Section */}
                    <div className='w-full lg:w-1/2 order-2'>
                        <div className='space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300'>
                            <p className='text-center lg:text-left'>
                                Tigernut is a tuber and not a nut which has numerous nutritional benefits earning it a ranking amongst the listed top 10 super foods in the world. Tigernuts are rich in protein, fiber, iron, healthy fat, potassium, magnesium, Vitamins C and E.
                            </p>
                            <p className='text-center lg:text-left'>
                                Tigernut helps fight malnutrition, control blood pressure, aids fertility and regulates blood sugar levels.
                            </p>
                            <p className='text-center lg:text-left'>
                                Tigernuts has a sweet taste, with a hint of coconut, and have a chewy texture.
                            </p>
                            <p className='text-center lg:text-left'>
                                Tigernuts is Gluten Free, Nut Free, perfect for people who are lactose intolerant
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
