
import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from './icons/HamburgerIcon';
import LanguageSelector from './LanguageSelector';
import SearchBar from './SearchBar';
import { Product } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  products?: Product[];
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, products = [] }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 gap-4">
          {/* Right side: Menu Button, Name, and Language Selector */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-label="فتح القائمة الجانبية"
              aria-expanded={false}
            >
              <HamburgerIcon />
            </button>
            <span className="hidden sm:block text-lg font-bold text-gray-700">واقف إنترناشيونال</span>
            <LanguageSelector />
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar products={products} />
          </div>

          {/* Left side: Logo */}
          <div className="flex-shrink-0 h-full py-2">
            <Link to="/" className="h-full flex items-center">
              <img 
                src="/images/logo.png" 
                alt="شعار واقف إنترناشيونال - مستلزمات طبية ومخبرية" 
                className="h-20 w-auto object-contain" 
              />
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar products={products} />
        </div>
      </div>
    </header>
  );
};

export default Header;
