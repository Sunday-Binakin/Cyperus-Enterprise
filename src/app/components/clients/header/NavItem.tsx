'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DropdownItem {
  label: string;
  href?: string;
}

interface NavItemProps {
  label: string;
  dropdownItems?: DropdownItem[];
  href?: string;
}

export default function NavItem({ label, dropdownItems, href }: NavItemProps) {
  const pathname = usePathname();
  const hasDropdown = dropdownItems && dropdownItems.length > 0;
  const isActive = href ? pathname === href : false;
  
  return (
    <li className={`relative group ${hasDropdown ? 'cursor-pointer' : ''} text-white ${isActive ? 'text-[#EFE554]' : 'hover:text-[#EFE554]'} transition-colors duration-200`}>
      {href ? (
        <Link href={href} className="flex items-center font-medium text-xs md:text-sm lg:text-base px-1 md:px-2">
          {label}
          {hasDropdown && <ChevronDown className="ml-1 md:ml-2" size={14} />}
        </Link>
      ) : (
        <span className="flex items-center font-medium text-xs md:text-sm lg:text-base px-1 md:px-2">
          {label}
          {hasDropdown && <ChevronDown className="ml-1 md:ml-2" size={14} />}
        </span>
      )}
            {hasDropdown && (
        <ul className="absolute left-0 top-full w-[12rem] md:w-[15rem] bg-black border border-gray-700 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
          {dropdownItems?.map((item, index) => (
            <li key={index} className="hover:bg-gray-800">
              {item.href ? (
                <Link href={item.href} className="block px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap">
                  {item.label}
                </Link>
              ) : (
                <span className="block px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}