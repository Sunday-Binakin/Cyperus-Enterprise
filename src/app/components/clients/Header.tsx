'use client'
import React, { useState, useEffect, useRef } from 'react';
import NavItem from './header/NavItem';
import SearchBar from './header/SearchBar';
import CartIndicator from './header/CartIndicator';
import { NAV_ITEMS, isNavItemWithDropdown } from './header/constants';
import Logo from './header/Logo';
import MobileMenuButton from './header/MobileMenuButton';

export default function Header() {
  const [showSearch, setShowSearch] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

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

  useEffect(() => {
    window.addEventListener('scroll', controlSearchBar);
    return () => window.removeEventListener('scroll', controlSearchBar);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-40 flex flex-col'>
        <div className='flex flex-row justify-between items-center p-4 bg-[#55006F] text-white'>
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Nav links - hidden on mobile */}
          <div className='-mt-10 hidden md:block'>
            <ul className='flex flex-row gap-10 font-semibold'>
              {NAV_ITEMS.map((item, index) => (
                isNavItemWithDropdown(item) ? (
                  <NavItem
                    key={index}
                    label={item.label}
                    dropdownItems={item.dropdownItems}
                  />
                ) : (
                  <NavItem
                    key={index}
                    label={item.label}
                    href={item.href}
                  />
                )
              ))}
            </ul>
          </div>

          {/* Cart, Subscribe, and Menu */}
          <div className='flex flex-row gap-6 items-center'>
            <div className='hidden md:block'>
              <CartIndicator itemCount={0} />
            </div>
            
            {/* Subscribe button - hidden on mobile */}
            <button className='bg-[#EFE554] text-black font-semibold py-3 px-4 rounded hidden md:block'>
              SUBSCRIBE & SAVE
            </button>
            
            {/* Menu icon - only on mobile */}
            <div className='md:hidden flex items-center gap-4'>
              <CartIndicator itemCount={0} />
              <MobileMenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
            </div>
          </div>
        </div>

        {/* Account and search - hidden on mobile */}
        <div className="hidden md:flex flex-col items-center bg-[#55006F] py-4 z-50">
          {/* <p className="text-white font-semibold -mt-16 mb-8">MY ACCOUNT</p> */}
          {/* Search Bar */}
          <div className={`transition-all duration-300 ${showSearch ? 'opacity-100' : 'opacity-0'} bg-white shadow-md`}>
            <SearchBar />
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden bg-[#55006F]">
          <p className="text-white font-semibold px-4 mb-2">MY ACCOUNT</p>
          <div className={`transition-all duration-300 ${showSearch ? 'opacity-100 max-h-[200px] py-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <SearchBar isMobile />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-4/5 bg-[#55006F] text-white transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-2xl font-bold'>Menu</h2>
              <button 
                onClick={toggleMenu}
                className='text-2xl p-2 focus:outline-none'
                aria-label='Close menu'
              >
                ×
              </button>
            </div>
            
            <ul className='space-y-6'>
              {NAV_ITEMS.map((item, index) => (
                <li key={index} className='border-b border-white/20 pb-2'>
                  {!isNavItemWithDropdown(item) && item.href ? (
                    <a 
                      href={item.href}
                      className='block py-2 text-lg font-semibold hover:text-[#EFE554] transition-colors'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <span className='block py-2 text-lg font-semibold'>
                        {item.label}
                      </span>
                      {isNavItemWithDropdown(item) && (
                        <ul className='mt-2 pl-4 space-y-2'>
                          {item.dropdownItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a 
                                href={subItem.href || '#'}
                                className='block py-1 text-gray-200 hover:text-[#EFE554] transition-colors'
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
              <li className='pt-4'>
                <button className='w-full bg-[#EFE554] text-black font-semibold py-3 px-4 rounded'>
                  SUBSCRIBE & SAVE
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div 
            className='fixed inset-0 bg-black/50 z-40 md:hidden'
            onClick={toggleMenu}
          />
        )}
      </div>
      
      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[80px] md:h-[100px]"></div>
    </>
  );
}
