import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative w-full -mt-8 gap-2 ">
      {/* <hr className="w-full border-t border-gray-300 " /> */}
      <input
        type="text"
        placeholder="Search For Products..."
        className="w-[90%] pl-4 pr-12 p-3  rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554] transition-all duration-300"
      />
      <button 
        type="button" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <Search className="text-[#4A651F] -ml-15 w-5 h-5" />
      </button>
    </div>
  );
}
