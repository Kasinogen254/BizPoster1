'use client';

import { LayoutGrid, Smartphone, Square, Check } from 'lucide-react';
import { CATEGORIES } from '@/src/config/dashboard-data'; // Ensure this path is correct for your config

interface FilterBarProps {
  activeCategory: string;
  setCategory: (c: string) => void;
  activeFormat: 'all' | 'square' | 'vertical';
  setFormat: (f: 'all' | 'square' | 'vertical') => void;
}

export function FilterBar({ activeCategory, setCategory, activeFormat, setFormat }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      
      {/* Categories (Scrollable Bubbles) */}
      <div className="w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all transform hover:-translate-y-0.5
                  ${isActive 
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-200 ring-2 ring-white" 
                    : "bg-white text-gray-500 hover:bg-white hover:text-gray-900 shadow-sm hover:shadow-md border border-gray-100"}`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Format Toggles (Segmented Control) */}
      <div className="flex items-center bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
        <button 
          onClick={() => setFormat('all')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeFormat === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <LayoutGrid size={16} /> All
        </button>
        <button 
          onClick={() => setFormat('vertical')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeFormat === 'vertical' ? 'bg-green-50 text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Smartphone size={16} /> Status
        </button>
        <button 
          onClick={() => setFormat('square')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeFormat === 'square' ? 'bg-purple-50 text-purple-700' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Square size={16} /> Post
        </button>
      </div>
    </div>
  );
}