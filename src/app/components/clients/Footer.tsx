import React from 'react'
import Image from 'next/image';
import SocialIcons from './footer/SocialIcons';
import ContactInfo from './footer/ContactInfo';
import SupportTeam from './footer/SupportTeam';
import InstagramFeed from './footer/InstagramFeed';

export default function Footer() {
  return (
    <div className='bg-black'>
      <div className='flex flex-col md:flex-row md:justify-around gap-8 md:gap-2 px-4 py-8'>
        <div className="flex flex-col items-start w-full md:w-[25%] mb-8 md:mb-0">
          <Image src="/images/clients/logo.png" alt="Logo" width={120} height={20} />
          <div className='text-white mt-2 ml-4 sm:ml-6'>
            Your one-stop-shop for nutty, yummy, nutritious, natural, sweet, and healthy tigernut products.
          </div>
          <SocialIcons />
        </div>
        <ContactInfo />
        <SupportTeam />
        {/* Instagram section on desktop with normal padding */}
        <div className="hidden md:block">
          <InstagramFeed />
        </div>
      </div>
      {/* Instagram section on mobile - full width, no padding */}
      <div className="md:hidden px-0">
        <InstagramFeed />
      </div>
    </div>
  )
}
