'use client';

import { motion } from 'framer-motion';
import { Edit3, Eye, Download } from 'lucide-react';
import { Poster } from '@/src/config/dashboard-data'; 

interface PosterCardProps {
  poster: Poster;
  onPreview: (poster: Poster) => void;
}

export function PosterCard({ poster, onPreview }: PosterCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className={`relative bg-gray-100 overflow-hidden ${poster.format === 'square' ? 'aspect-square' : 'aspect-4/5'}`}>
         <img 
          src={poster.image} 
          alt={poster.title} 
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
           <button 
             onClick={() => onPreview(poster)}
             className="bg-white text-gray-700 p-3 rounded-full hover:text-green-600 hover:scale-110 transition shadow-lg flex flex-col items-center group/btn" 
             title="Preview on Phone"
           >
              <Eye size={20} />
           </button>
           <button 
             className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 hover:scale-110 transition shadow-lg" 
             title="Edit & Customize"
           >
              <Edit3 size={20} />
           </button>
        </div>

        {/* Format Badge */}
        <div className="absolute top-3 right-3">
          {poster.format === 'vertical' ? (
             <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Status
             </span>
          ) : (
             <span className="bg-white/90 backdrop-blur-md text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
               Post
             </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1" title={poster.title}>
            {poster.title}
          </h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {poster.price === 0 ? 'FREE' : `KES ${poster.price}`}
          </span>
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
           <span>{poster.category}</span>
           <div className="flex gap-2">
              <button className="hover:text-blue-600 transition flex items-center gap-1">
                <Download size={14} /> <span className="hidden sm:inline">Save</span>
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}