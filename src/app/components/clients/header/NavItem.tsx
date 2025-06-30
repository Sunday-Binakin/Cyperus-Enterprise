import { ChevronDown } from 'lucide-react';

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
  const hasDropdown = dropdownItems && dropdownItems.length > 0;
  
  return (
    <li className={`relative group ${hasDropdown ? 'cursor-pointer' : ''}`}>
      <span className="flex">
        {label}
        {hasDropdown && <ChevronDown />}
      </span>
      {hasDropdown && (
        <ul className="absolute left-0 mt-2 w-[15rem] bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity z-10">
          {dropdownItems.map((item, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
} 