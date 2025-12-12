'use client';

import { Menu, Search, Sparkles } from 'lucide-react';
import { UserNav } from './user-nav';

interface DashboardNavbarProps {
  toggleSidebar: () => void;
}

export function DashboardNavbar({ toggleSidebar }: DashboardNavbarProps) {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 h-16 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm flex items-center justify-between px-4 transition-all duration-300 max-w-7xl mx-auto">
      
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-white/50 text-gray-600 rounded-full transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={16} fill="currentColor" />
           </div>
           <span className="text-lg font-bold tracking-tight text-gray-800">
             Biz<span className="text-blue-600">Poster</span>.
           </span>
        </div>
      </div>

      {/* Center: Search Bar (Softer Look) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl leading-5 bg-gray-100/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all sm:text-sm"
          />
        </div>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-3">
        <UserNav />
      </div>
    </nav>
  );
}