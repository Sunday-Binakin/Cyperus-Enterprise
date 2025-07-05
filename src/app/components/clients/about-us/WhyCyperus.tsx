"use client";
import React from 'react'
import Image from 'next/image'

export const WhyCyperus = () => {
    return (
        <div className='flex flex-row items-center justify-center bg-black'>
            <div className=' w-1/2 h-[500px] text-white flex flex-col justify-center items-center p-16 mt-4'>
                <div>
                    <h2 className='text-2xl font-bold text-[#EFE554] text-left'>We are Cyperus Enterprise</h2>
                    <h3 className='text-xl text-white mt-2 mb-2'>Our mission is to provide the best quality of life to our customers</h3>
                </div>
                <p className='text-l text-gray-300 m-2 text-left'>Tigernuts Republic Nigeria, is a 100% subsidiary of O'ZIBANA Limited Nigeria, a company registered in Nigeria on April 2017.</p>
                <p className='text-l text-gray-300 m-2 text-left'>Tigernuts Republic Nigeria, as the name connotes, is a one stop center for Tigernuts based products. We have since inception in March 2017 developed 21 variants of Tigernuts Milk and over 10 different food products from Tigernuts.</p>
                <p className='text-l text-gray-300 m-2 text-left'>This has been done with our focus solely on using Tigernuts in a very dynamic way, such that every household is able to relate with at least one of our various innovative, nutritious and healthy products.</p>
                <p className='text-l text-gray-300 m-2 text-left'>Tigernuts Republic Nigeria won the ACE AWARDS for Best Foods Produce Innovation in April 2018 and over its years of operations have set a niche for herself in the Food and Beverage industry in Nigeria.</p>
            </div>
            <div className='relative w-1/2 h-[500px] p-16'>
                <Image 
                    src="/images/clients/hero/slider1.JPG" 
                    alt="Cyperus Enterprise"
                    width={400}
                    height={400}
                    className="object-cover rounded-lg"
                    priority
                    quality={100}
                />
            </div>
        </div>
    )
}
