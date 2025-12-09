'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

export function AuthBanner() {
  return (
    <div className="relative h-full w-full bg-blue-600 overflow-hidden flex flex-col justify-between p-12 text-white">
      
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Top Content */}
      <div className="relative z-10">
         <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30 mb-6">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            Rated #1 Marketing Tool in Kenya
         </div>
         <h2 className="text-4xl font-bold leading-tight mb-4">
           Turn your phone into a <br />
           <span className="text-blue-200">Marketing Agency.</span>
         </h2>
         <p className="text-blue-100 text-lg max-w-md leading-relaxed">
           Join 5,000+ Kenyan entrepreneurs creating stunning posters for WhatsApp & Instagram in seconds.
         </p>
      </div>

      {/* Middle Visual (Floating Card Effect) */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-10">
         <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="relative w-64 aspect-4/5 bg-white rounded-xl shadow-2xl rotate-3 border-4 border-white/20"
         >
            {/* Placeholder Image Div */}
            <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center text-gray-400 text-xs">
               <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -right-12 top-10 bg-white text-gray-900 p-3 rounded-lg shadow-xl"
            >
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold">Generated!</div>
                    <div className="text-gray-500">Just now</div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </div>

      {/* Bottom Testimonial */}
      <div className="relative z-10 bg-blue-700/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30">
        <p className="text-blue-50 italic mb-4 text-sm">
          &ldquo;I used to pay a designer 500 bob per poster. Now I make 10 posters a week for free. This app is a game changer for my boutique.&rdquo;
        </p>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center font-bold text-white">
             S
           </div>
           <div>
             <div className="font-bold text-sm">Sarah Wanjiku</div>
             <div className="text-xs text-blue-200">Owner, Styles by Sarah</div>
           </div>
        </div>
      </div>

    </div>
  );
}