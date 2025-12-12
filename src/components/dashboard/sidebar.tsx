'use client';

import { LayoutGrid, Star, TrendingUp, Clock, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  { name: "All Templates", icon: LayoutGrid, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Best Sellers", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "New Arrivals", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Trending", icon: TrendingUp, color: "text-red-500", bg: "bg-red-50" },
  { name: "Offers & Sales", icon: Tag, color: "text-green-600", bg: "bg-green-50" },
];

interface SidebarProps {
  isOpen: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  toggleSidebar?: () => void; // Added toggle prop
}

export function Sidebar({ isOpen, activeCategory, setActiveCategory, toggleSidebar }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop (Click outside to close) */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      />

      <aside 
        className={`fixed top-24 bottom-4 left-4 z-40
        bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-gray-200/50 
        rounded-3xl overflow-hidden flex flex-col
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0"}`}
      >
        <div className="p-3 flex flex-col gap-2 h-full">
          
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end mb-2 px-2 pt-2">
             <button onClick={toggleSidebar} className="p-2 bg-white rounded-full text-gray-500 shadow-sm">
               <X size={20}/>
             </button>
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 py-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeCategory === item.name || (activeCategory === "All" && item.name === "All Templates");
              
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveCategory(item.name === "All Templates" ? "All" : item.name)}
                  className={`relative group flex items-center w-full p-2 rounded-2xl transition-all duration-300
                    ${isActive 
                      ? "bg-white shadow-md shadow-blue-100 ring-1 ring-blue-50" 
                      : "hover:bg-white/60"}`}
                >
                  {/* Icon Container */}
                  <div className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 z-10
                    ${isActive ? item.bg + ' ' + item.color : 'bg-transparent text-gray-400 group-hover:bg-gray-50 group-hover:text-gray-600'}`}>
                    <item.icon size={20} />
                  </div>
                  
                  {/* Text Label with Smooth Fade/Slide */}
                  <div className={`flex items-center whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "opacity-100 w-auto ml-3 translate-x-0" : "opacity-0 w-0 -ml-2 -translate-x-4 md:opacity-0"}`}>
                    <span className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {item.name}
                    </span>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-500 rounded-r-full" />
                  )}
                  
                  {/* Hover Tooltip (Only visible when collapsed on desktop) */}
                  {!isOpen && (
                    <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto space-y-3">
            
            {/* Promo Card (Hides smoothly) */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="p-4 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl text-white text-center shadow-lg shadow-indigo-200 mx-1 mb-2">
                <p className="text-sm font-bold mb-1">BizPoster Pro</p>
                <p className="text-[10px] text-indigo-100 mb-3 leading-tight">Unlock all templates & remove watermarks.</p>
                <button className="w-full bg-white text-indigo-600 text-xs font-bold py-2 rounded-lg shadow-sm hover:scale-105 transition-transform">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Desktop Collapse Toggle */}
            <button 
              onClick={toggleSidebar}
              className="hidden md:flex w-full items-center justify-center p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}