'use client';

import { LayoutGrid, Smartphone, Square } from 'lucide-react';
import { CATEGORIES } from '@/src/config/dashboard-data'; 

interface FilterBarProps {
  activeCategory: string;
  setCategory: (c: string) => void;
  activeFormat: 'all' | 'square' | 'vertical';
  setFormat: (f: 'all' | 'square' | 'vertical') => void;
}

export function FilterBar({ activeCategory, setCategory, activeFormat, setFormat }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      
      {/* Categories (Scrollable) */}
      <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border
                ${activeCategory === cat 
                  ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Format Toggles */}
      <div className="flex items-center bg-white p-1 rounded-lg border border-gray-200 shadow-xs self-end md:self-auto">
        <button 
          onClick={() => setFormat('all')}
          className={`p-2 rounded-md transition-all ${activeFormat === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          title="All Formats"
        >
          <LayoutGrid size={18} />
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <button 
          onClick={() => setFormat('vertical')}
          className={`p-2 rounded-md transition-all ${activeFormat === 'vertical' ? 'bg-green-50 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
          title="WhatsApp Status (Vertical)"
        >
          <Smartphone size={18} />
        </button>
        <button 
          onClick={() => setFormat('square')}
          className={`p-2 rounded-md transition-all ${activeFormat === 'square' ? 'bg-purple-50 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          title="Instagram Post (Square)"
        >
          <Square size={18} />
        </button>
      </div>
    </div>
  );
}