import { Search } from 'lucide-react';

interface SearchBarProps {
  isMobile?: boolean;
}

export default function SearchBar({ isMobile = false }: SearchBarProps) {
  return (
    <div className={`relative -mt-10 ${isMobile ? 'w-full px-4 max-w-md' : 'w-[1000px] max-w-full'} `}>
      <input
        type="text"
        placeholder="Search For Products..."
        className="w-full pl-4 pr-10 py-2 rounded-lg sm:rounded-xl md:rounded-5xl lg:rounded-5xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554] transition-all duration-300"
      />
      <Search className={`absolute ${isMobile ? 'right-7' : 'right-3'} top-1/2 transform -translate-y-1/2 text-[#55006F] w-5 h-5`} />
    </div>
  );
}