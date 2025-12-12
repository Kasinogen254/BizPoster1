'use client';

import { motion } from 'framer-motion';
import { Edit3, Eye, Download, Lock } from 'lucide-react';
import { Poster } from '@/src/config/dashboard-data';
import { Smartphone } from 'lucide-react';

interface PosterCardProps {
  poster: Poster;
  onPreview: (poster: Poster) => void;
}

export function PosterCard({ poster, onPreview }: PosterCardProps) {
  // Determine badge color based on category
  const isFree = poster.price === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer"
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${poster.format === 'square' ? 'aspect-square' : 'aspect-[4/5]'}`}>
         
         <img 
          src={poster.image} 
          alt={poster.title} 
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Dynamic Gradient Overlay (Only on Hover) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
           
           {/* Action Buttons */}
           <div className="flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button 
                onClick={(e) => { e.stopPropagation(); onPreview(poster); }}
                className="flex-1 bg-white/20 backdrop-blur-md text-white py-3 rounded-2xl font-bold text-sm hover:bg-white hover:text-black transition flex items-center justify-center gap-2"
              >
                 <Eye size={18} /> Preview
              </button>
              <button 
                className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                 <Edit3 size={18} /> Edit
              </button>
           </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {isFree ? (
               <span className="bg-green-400/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
                 Free
               </span>
            ) : (
               <span className="bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                 <Lock size={10} /> Premium
               </span>
            )}

            {poster.format === 'vertical' && (
              <span className="bg-white/90 backdrop-blur-md text-gray-800 p-1.5 rounded-full shadow-sm">
                 <Smartphone size={14} />
              </span>
            )}
        </div>
      </div>

      {/* Minimal Details Footer */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">{poster.title}</h3>
            <p className="text-xs text-gray-400 font-medium">{poster.category}</p>
          </div>
          <button className="text-gray-300 hover:text-blue-600 transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}