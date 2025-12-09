'use client';

import { X, Share2, Heart, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Poster } from '@/src/config/dashboard-data'; 

interface PreviewModalProps {
  poster: Poster | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ poster, isOpen, onClose }: PreviewModalProps) {
  if (!poster) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Phone Frame */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[360px] aspect-9/19 bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20" />

            {/* WhatsApp Header UI */}
            <div className="absolute top-0 w-full p-4 pt-8 bg-linear-to-b from-black/60 to-transparent z-10 flex items-center gap-3 text-white">
               <ArrowLeft size={20} className="cursor-pointer" onClick={onClose} />
               <div className="flex-1">
                 <p className="font-semibold text-sm">My Status</p>
                 <p className="text-[10px] text-gray-300">Just now</p>
               </div>
               <div className="flex gap-4">
                 <Heart size={20} />
                 <Share2 size={20} />
               </div>
            </div>

            {/* The Poster Image */}
            <div className="flex-1 flex items-center justify-center bg-black relative">
               <img 
                 src={poster.image} 
                 alt={poster.title} 
                 className={`w-full object-contain ${poster.format === 'square' ? 'h-auto' : 'h-full'}`}
               />
               
               {/* Watermark Note */}
               <div className="absolute bottom-32 bg-black/50 px-3 py-1 rounded-full text-[10px] text-white/80">
                  BizPoster Preview
               </div>
            </div>

            {/* WhatsApp Bottom Reply Bar */}
            <div className="absolute bottom-0 w-full p-4 bg-black/40 backdrop-blur-md flex flex-col gap-2 z-10">
               <div className="flex items-center justify-center mb-2">
                 <div className="text-white text-xs font-medium bg-gray-800/80 px-3 py-1 rounded-full">
                    <span className="opacity-70">👁️ 0 views</span>
                 </div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="text-white/80 text-xs mb-1">Reply</div>
                  <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                     <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                  </div>
               </div>
            </div>

          </motion.div>

          {/* Close Button Outside (Desktop) */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition hidden md:block"
          >
            <X size={32} />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}