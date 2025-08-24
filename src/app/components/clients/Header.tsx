"use client";
import React, { useState, useEffect, useRef } from "react";
import NavItem from "./header/NavItem";
import SearchBar from "./header/SearchBar";
import CartIndicator from "./header/CartIndicator";
import CartPopover from "./header/CartPopover";
import { NAV_ITEMS, isNavItemWithDropdown } from "./header/constants";
import Logo from "./header/Logo";
import MobileMenuButton from "./header/MobileMenuButton";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function Header() {
  const [showSearch, setShowSearch] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAnyDropdownHovered, setIsAnyDropdownHovered] = useState(false);
  const [showCartPopover, setShowCartPopover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();

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
        <div className="flex flex-row justify-between items-center p-2 lg:p-3 w-full px-4 lg:px-8 min-h-[60px]">
          {/* Logo */}
          <div className="flex-shrink-0 w-24 md:w-28 lg:w-32 xl:w-40">
            <Logo />
          </div>

          {/* Nav links - hidden on mobile */}
          <div className="hidden md:flex flex-1 justify-center overflow-hidden px-2">
            <ul className="flex flex-row gap-1 md:gap-2 lg:gap-4 font-medium whitespace-nowrap text-xs md:text-sm lg:text-base items-center">
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

              {/* Optional Orders link for guest */}
              <Link href="/order-success" className="text-white hover:text-[#EFE554] transition-colors text-xs md:text-sm lg:text-base px-1 md:px-2">
                ORDERS
              </Link>
            </ul>
          </div>

          {/* Cart, Subscribe, and Menu */}
          <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 items-center flex-shrink-0">
            <div
              className="hidden md:block relative"
              ref={cartRef}
              onMouseEnter={() => getTotalItems() > 0 && setShowCartPopover(true)}
              onMouseLeave={() => setShowCartPopover(false)}
            >
              <CartIndicator itemCount={getTotalItems()} />
              {showCartPopover && getTotalItems() > 0 && <CartPopover />}
            </div>

            {/* Subscribe button - hidden on mobile and small screens */}
            <button className="bg-[#C2A83E] text-white font-semibold border border-[#C2A83E] hover:bg-[#55006F] hover:text-white hover:border-[#55006F] transition-colors duration-300 ease-in-out transform hover:scale-105 py-1 md:py-2 px-3 md:px-4 lg:px-6 rounded text-xs md:text-sm hidden md:block whitespace-nowrap">
              <span className="hidden lg:inline">SUBSCRIBE & SAVE</span>
              <span className="lg:hidden">SUBSCRIBE</span>
            </button>

            {/* Menu icon - mobile and tablet */}
            <div className="md:hidden flex items-center gap-2">
              <div
                className="relative"
                onClick={() => getTotalItems() > 0 && setShowCartPopover(!showCartPopover)}
              >
                <CartIndicator itemCount={getTotalItems()} />
                {showCartPopover && getTotalItems() > 0 && (
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
        <div className="hidden lg:flex flex-col items-center bg-[#4A651F] py-2 relative z-10 w-full">
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
        <div className="lg:hidden w-full px-4 pb-2">
          <div
            className={`transition-all duration-300 transform ${
              showSearch
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="max-w-full mx-auto">
              <SearchBar />
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
              
              {/* Optional Orders link for guest */}
              <li className="border-b border-white/20 pb-2">
                <Link
                  href="/order-success"
                  className="block py-2 text-lg font-semibold hover:text-[#EFE554] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ORDERS
                </Link>
              </li>
              
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[60px] md:h-[80px]"></div>
    </>
  );
}

