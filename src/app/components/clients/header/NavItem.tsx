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
        <Link href={href} className="flex items-center font-medium">
          {label}
          {hasDropdown && <ChevronDown className="ml-1" size={16} />}
        </Link>
      ) : (
        <span className="flex items-center font-medium">
          {label}
          {hasDropdown && <ChevronDown className="ml-1" size={16} />}
        </span>
      )}
      {hasDropdown && (
        <ul className="absolute left-0 mt-2 w-[15rem] bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
          {dropdownItems.map((item, index) => (
            <li key={index} className="px-4 py-2 hover:text-[#EFE554]">
              <Link href={item.href || '#'} className="block w-full">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}