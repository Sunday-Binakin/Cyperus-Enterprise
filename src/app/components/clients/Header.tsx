"use client";
import React, { useState, useEffect, useRef } from "react";
import NavItem from "./header/NavItem";
import SearchBar from "./header/SearchBar";
import CartIndicator from "./header/CartIndicator";
import CartPopover from "./header/CartPopover";
import { NAV_ITEMS, isNavItemWithDropdown } from "./header/constants";
import Logo from "./header/Logo";
import MobileMenuButton from "./header/MobileMenuButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useCart } from "../../../store/hooks";
import Link from "next/link";

export default function Header() {
  const [showSearch, setShowSearch] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAnyDropdownHovered, setIsAnyDropdownHovered] = useState(false);
  const [showCartPopover, setShowCartPopover] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const user = authState?.user ?? null;
  const { totalItems } = useCart();
  
  const handleSignOut = async () => {
    try {
      const { logoutUser } = await import('../../../store/authActions');
      dispatch(logoutUser());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const controlSearchBar = React.useCallback(() => {
    const currentScrollY = window.scrollY;

    // Hide search bar when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlSearchBar);
    return () => window.removeEventListener("scroll", controlSearchBar);
  }, [controlSearchBar]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex flex-col bg-[#4A651F]">
        <div className="flex flex-row justify-between items-center p-4 w-full px-6">
          {/* Logo */}
          <div>
            <Logo   />
          </div>

          {/* Nav links - hidden on mobile */}
          <div className="hidden md:block">
            <ul className="flex flex-row gap-4 lg:gap-6 font-semibold whitespace-nowrap">
              {/* Standard nav items */}
              {NAV_ITEMS.filter(item => item.label !== 'MY ACCOUNT').map((item, index: number) =>
                isNavItemWithDropdown(item) ? (
                  <div
                    key={index}
                    onMouseEnter={() => setIsAnyDropdownHovered(true)}
                    onMouseLeave={() => setIsAnyDropdownHovered(false)}
                  >
                    <NavItem
                      label={item.label}
                      dropdownItems={item.dropdownItems}
                    />
                  </div>
                ) : (
                  <NavItem key={index} label={item.label} href={item.href} />
                )
              )}
              
              {/* Auth-based nav items */}
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/my-account" className="text-white hover:text-[#EFE554] transition-colors">
                    MY ACCOUNT
                  </Link>
                  <button 
                    onClick={() => handleSignOut()}
                    className="bg-[#EFE554] text-[#55006F] px-4 py-2 rounded hover:bg-[#55006F] hover:text-[#EFE554] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="relative group">
                  <button className="text-white hover:text-[#EFE554] transition-colors flex items-center gap-1 font-medium">
                    MY ACCOUNT
                    <svg 
                      className="w-4 h-4 transition-transform group-hover:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-[12rem] bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <Link 
                      href="/auth/login" 
                      className="block px-4 py-2 hover:text-[#EFE554] transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="block px-4 py-2 hover:text-[#EFE554] transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </ul>
          </div>

          {/* Cart, Subscribe, and Menu */}
          <div className="flex flex-row gap-6 items-center">
            <div
              className="hidden md:block relative"
              ref={cartRef}
              onMouseEnter={() => totalItems > 0 && setShowCartPopover(true)}
              onMouseLeave={() => setShowCartPopover(false)}
            >
              <CartIndicator itemCount={totalItems} />
              {showCartPopover && totalItems > 0 && <CartPopover />}
            </div>

            {/* Subscribe button - hidden on mobile */}
            <button className="bg-[#C2A83E] text-white font-semibold border border-[#C2A83E] hover:bg-[#55006F] hover:text-white hover:border-[#55006F] transition-colors duration-300 ease-in-out transform hover:scale-105 py-3 px-6 rounded-md hidden md:block">
              SUBSCRIBE & SAVE
            </button>

            {/* Menu icon - only on mobile */}
            <div className="md:hidden flex items-center gap-4">
              <div
                className="relative"
                onClick={() => totalItems > 0 && setShowCartPopover(!showCartPopover)}
              >
                <CartIndicator itemCount={totalItems} />
                {showCartPopover && totalItems > 0 && (
                  <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setShowCartPopover(false)}>
                    <div className="absolute top-20 right-4 w-80" onClick={(e) => e.stopPropagation()}>
                      <CartPopover />
                    </div>
                  </div>
                )}
              </div>
              <MobileMenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
            </div>
          </div>
        </div>

        {/* Account and search - hidden on mobile */}
        <div className="hidden md:flex flex-col items-center bg-[#4A651F] py-4 relative z-10 w-full">
          <div className="w-[90%] max-w-[1400px] mx-auto">
            <div
              className={`transition-all duration-300 transform ${
                showSearch && !isAnyDropdownHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 pointer-events-none -translate-y-2"
              }`}
            >
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden w-full px-4 pb-4">
          <div
            className={`transition-all duration-300 transform ${
              showSearch
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="max-w-full mx-auto">
              <SearchBar   />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-4/5 bg-[#4A651F] text-white transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-2xl p-2 focus:outline-none"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <ul className="space-y-6">
              {/* Standard nav items */}
              {NAV_ITEMS.filter(item => item.label !== 'MY ACCOUNT').map((item, index: number) => (
                <li key={index} className="border-b border-white/20 pb-2">
                  {!isNavItemWithDropdown(item) && item.href ? (
                    <a
                      href={item.href}
                      className="block py-2 text-lg font-semibold hover:text-[#EFE554] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <span className="block py-2 text-lg font-semibold">
                        {item.label}
                      </span>
                      {isNavItemWithDropdown(item) && (
                        <ul className="mt-2 pl-4 space-y-2">
                          {item.dropdownItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href={subItem.href || "#"}
                                className="block py-1 text-gray-200 hover:text-[#EFE554] transition-colors"
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
              
              {/* Auth-based nav items */}
              {user ? (
                <>
                  <li className="border-b border-white/20 pb-2">
                    <Link
                      href="/my-account"
                      className="block py-2 text-lg font-semibold hover:text-[#EFE554] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      MY ACCOUNT
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-[#EFE554] text-[#55006F] py-3 px-4 rounded font-semibold hover:bg-[#55006F] hover:text-[#EFE554] transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="border-b border-white/20 pb-2">
                    <button
                      onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                      className="flex items-center justify-between w-full py-2 text-lg font-semibold hover:text-[#EFE554] transition-colors"
                    >
                      MY ACCOUNT
                      <svg 
                        className={`w-4 h-4 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showAccountDropdown && (
                      <div className="mt-2 pl-4 space-y-2">
                        <Link
                          href="/auth/login"
                          className="block py-2 text-base text-gray-300 hover:text-[#EFE554] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/auth/register"
                          className="block py-2 text-base text-gray-300 hover:text-[#EFE554] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </li>
                </>
              )}
              
              <li className="pt-4">
                <button className="w-full bg-[#C2A83E] text-white font-semibold py-3 px-4 rounded hover:bg-[#55006F] transition-colors duration-300">
                  SUBSCRIBE & SAVE
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[80px] md:h-[100px]"></div>
    </>
  );
}

