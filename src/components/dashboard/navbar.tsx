'use client';

import { Menu, Search, Bell } from 'lucide-react';
import Link from 'next/link';

interface DashboardNavbarProps {
  toggleSidebar: () => void;
}

export function DashboardNavbar({ toggleSidebar }: DashboardNavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 px-4 flex items-center justify-between">
      
      {/* Left: Mobile Toggle & Logo Text */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-gray-50 text-gray-600 rounded-full transition-colors"
        >
          <Menu size={20} />
        </button>
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hidden md:block">
          Biz<span className="text-blue-600">Poster</span>.
        </Link>
      </div>

      {/* Center: Search Bar (Refined) */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search templates (e.g., 'Sale', 'M-Pesa', 'Hiring')..." 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all sm:text-sm"
          />
        </div>
      </div>

      {/* Right: Actions (Simplified) */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm">
          My Projects
        </button>
      </div>
    </nav>
  );
}