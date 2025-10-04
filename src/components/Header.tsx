import React from 'react';
import { Search } from 'lucide-react';

const Header: React.FC = () => {

  return (
    <header className="bg-[#1A2A4F] text-white h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex-1"></div>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent w-64"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;