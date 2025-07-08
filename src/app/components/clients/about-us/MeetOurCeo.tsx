import React from 'react'
import Image from 'next/image'

export const MeetOurCeo = () => {
    return (
        <div className='flex flex-col md:flex-col items-center justify-center gap-8 bg-black'>
            <div className='flex flex-col'>
                <p className='text-xl font-bold text-yellow-500 text-center'>THE TIGERNUT-WIZ</p>
                <p className='text-3xl text-white mt-2 mb-2 text-center'>Meet The Brain Behind Cyperus Enterprise</p>
                
            </div>
            <div className='flex flex-col md:flex-row items-start justify-between mt-4 gap-[5%] w-full'>
                <div className='w-full md:w-[40%] px-10'>
                    <Image 
                        src="/images/clients/hero/slider1.JPG" 
                        alt="CEO of Cyperus Enterprise" 
                        width={500} 
                        height={500}
                        className="w-full h-[600px] object-cover rounded-lg shadow-lg" 
                        priority
                        quality={100}
                    />
                </div>
                <div className='w-full md:w-[55%] text-white space-y-4 px-6'>
                    <p>Our CEO, Temitope Oriola, graduated from the University of Lagos, Akoka BSC. Banking and Finance with Second Class Upper in 2007, she has a Diploma in Finance and second level of ACCA.</p>             
                    <p>She was a Financial Advisor who resigned as an Associate with one of the leading Investment Banking firms in Lagos, Nigeria after 9 years of service in 2019.</p>
                    <p>With intense passion for cooking, continuous research and quest to learn complex dishes, she stumbled across Tigernut milk on YouTube in February 2017. After making Tigernut milk, the curious part of her felt that the chaff from the milk couldn&apos;t be ignored.</p>
                    <p>Through extensive research, she realized Tigernut wasn&apos;t just good for milk but is currently 1 of the top 10 Super foods in the world, perfect for diabetics, weight watchers, good guts, fertility, heart and general wellness.</p>
                    <p>That was the start of Behealthyng now TIGERNUTS REPUBLIC first in her thoughts, her kitchen, amongst family/friends and to the world. It can simply be said that &apos;Her passion for cooking led her to the discovery of the wonders of Tigernut&ldquo;.</p>
                    <p>She incorporated her company in May 2017, an indigenous company with 100% focus on Tigernut.</p>
                    <p>This is an endless journey of continuous research, improvements and addition to the existing Tigernut range of products from Tigernuts Republic till Tigernuts Republic becomes a household name Globally.</p>
                </div>
            </div>
        </div>
        
    )
}
