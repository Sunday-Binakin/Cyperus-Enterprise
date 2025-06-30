'use client'
import React, { useState, useEffect } from 'react';
import NavItem from './header/NavItem';
import SearchBar from './header/SearchBar';
import CartIndicator from './header/CartIndicator';
import { NAV_ITEMS } from './header/constants';
 
import Logo from './header/Logo';

import MobileMenuButton from './header/MobileMenuButton';

export default function Header() {
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlSearchBar = () => {
      const currentScrollY = window.scrollY;
      
      // Hide search bar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlSearchBar);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlSearchBar);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-50 flex flex-col'>
        <div className='flex flex-row justify-between items-center p-4 bg-[#55006F] text-white'>
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Nav links - hidden on mobile */}
          <div className='-mt-10 hidden md:block'>
            <ul className='flex flex-row gap-10 font-semibold'>
              {NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={index}
                  label={item.label}
                  dropdownItems={item.dropdownItems}
                />
              ))}
            </ul>
          </div>

          {/* Cart, Subscribe, and Menu */}
          <div className='flex flex-row gap-6 items-center'>
            <CartIndicator itemCount={0} />
            
            {/* Subscribe button - hidden on mobile */}
            <button className='bg-[#EFE554] text-black font-semibold py-3 px-4 rounded hidden md:block'>
              SUBSCRIBE & SAVE
            </button>
            
            {/* Menu icon - only on mobile */}
            <MobileMenuButton />
          </div>
        </div>

        {/* Account and search - hidden on mobile */}
        <div className={`hidden md:flex flex-col items-center bg-[#55006F] py-4 transition-all duration-300 ${showSearch ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <p className="text-white font-semibold -mt-16 mb-8">MY ACCOUNT</p>
          <SearchBar />
        </div>

        {/* Mobile search bar */}
        <div className={`md:hidden transition-all duration-300 bg-[#55006F] ${showSearch ? 'opacity-100 max-h-[200px] py-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <SearchBar isMobile />
        </div>
      </div>
      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[80px] md:h-[100px]"></div>
    </>
  );
}

