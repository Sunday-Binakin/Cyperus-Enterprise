import React from 'react';

interface MobileMenuButtonProps {
  onClick?: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => (
  <button
    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#EFE554]"
    aria-label="Open mobile menu"
    onClick={onClick}
    type="button"
  >
    {/* Simple hamburger icon */}
    <span className="block w-6 h-0.5 bg-white mb-1"></span>
    <span className="block w-6 h-0.5 bg-white mb-1"></span>
    <span className="block w-6 h-0.5 bg-white"></span>
  </button>
);

export default MobileMenuButton;