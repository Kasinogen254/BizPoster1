'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DashboardShell } from '@/src/components/dashboard/shell';
import { PosterCard } from '@/src/components/dashboard/poster-card';
import { FilterBar } from '@/src/components/dashboard/filter-bar';
import { PreviewModal } from '@/src/components/dashboard/preview-modal';
import { getTemplates } from '@/src/actions/templates'; // <--- Import Action
import { Loader2 } from 'lucide-react';

export default function TemplatesPage() {
  // Filter State
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFormat, setActiveFormat] = useState<'all' | 'square' | 'vertical'>('all');
  
  // Data State
  const [posters, setPosters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [selectedPoster, setSelectedPoster] = useState<any | null>(null);

  // FETCH DATA EFFECT
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // We pass the filters to the server (or filter locally)
      const { data, error } = await getTemplates(activeCategory, activeFormat);
      
      if (data) {
        setPosters(data);
      }
      setIsLoading(false);
    };

    loadData();
  }, [activeCategory, activeFormat]);

  return (
    <DashboardShell activeCategory={activeCategory} setActiveCategory={setActiveCategory}>
      
      {/* 1. Header Area */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Choose a Template</h1>
        <p className="text-gray-500 text-sm mt-1">Select a design to start customizing for your business.</p>
      </div>

      {/* 2. Filters */}
      <FilterBar 
        activeCategory={activeCategory}
        setCategory={setActiveCategory}
        activeFormat={activeFormat}
        setFormat={setActiveFormat}
      />

      {/* 3. Grid or Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : posters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          <AnimatePresence mode='popLayout'>
            {posters.map((poster) => (
              <PosterCard 
                key={poster.id} 
                poster={{
                    ...poster,
                    price: poster.isPremium ? 500 : 0, // Map DB fields to UI expectations
                    rating: 5.0,
                    isDigital: poster.isDigital ?? true
                }} 
                onPreview={setSelectedPoster}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        // Empty State
        <div className="py-20 text-center text-gray-500">
           <p>No templates found for this filter.</p>
           <button 
             onClick={() => { setActiveCategory("All"); setActiveFormat("all"); }}
             className="text-blue-600 font-bold text-sm mt-2 hover:underline"
           >
             Clear Filters
           </button>
        </div>
      )}

      {/* 4. Preview Modal */}
      <PreviewModal 
        poster={selectedPoster} 
        isOpen={!!selectedPoster} 
        onClose={() => setSelectedPoster(null)} 
      />

    </DashboardShell>
  );
}