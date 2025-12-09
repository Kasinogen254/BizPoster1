'use client';

import { LayoutGrid, Star, TrendingUp, Clock, Tag } from 'lucide-react';

// Enhanced categories with icons for a better look
const NAV_ITEMS = [
  { name: "All Templates", icon: LayoutGrid },
  { name: "Best Sellers", icon: Star },
  { name: "New Arrivals", icon: Clock },
  { name: "Trending", icon: TrendingUp },
  { name: "Offers & Sales", icon: Tag },
];

interface SidebarProps {
  isOpen: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function Sidebar({ isOpen, activeCategory, setActiveCategory }: SidebarProps) {
  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-100 overflow-y-auto transition-all duration-300 z-40
      ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0"}`}
    >
      <div className="p-4 flex flex-col gap-1">
        
        {/* Section Label */}
        {isOpen && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Discover</div>}

        {NAV_ITEMS.map((item) => {
          const isActive = activeCategory === item.name || (activeCategory === "All" && item.name === "All Templates");
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveCategory(item.name === "All Templates" ? "All" : item.name)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-sm font-medium group
                ${isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              <item.icon 
                size={20} 
                className={isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"} 
              />
              <span className={`${!isOpen && "md:hidden"} whitespace-nowrap`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Optional: Promotion Box in Sidebar */}
      {isOpen && (
        <div className="absolute bottom-6 left-4 right-4 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white text-center">
          <p className="text-sm font-bold mb-1">Go Premium</p>
          <p className="text-xs text-blue-100 mb-3">Remove watermarks & unlock all posters.</p>
          <button className="w-full bg-white text-blue-700 text-xs font-bold py-2 rounded-lg shadow-sm">
            Upgrade Plan
          </button>
        </div>
      )}
    </aside>
  );
}