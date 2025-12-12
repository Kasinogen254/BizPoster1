'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Download, Loader2, RefreshCw, Smartphone, Check } from 'lucide-react';
import Link from 'next/link';

// Mock Data - In a real app, you'd fetch this config based on params.templateId
const TEMPLATE_DEFAULTS = {
  id: 'fashion-01',
  title: 'Fashion New Arrival',
  defaultImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  defaultColor: 'blue'
};

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const router = useRouter();
  
  // --- STATE ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  
  // The User's Input Data
  const [data, setData] = useState({
    businessName: 'My Business',
    phone: '0712 345 678',
    offer: 'NEW ARRIVALS',
    color: 'blue',
    imageUrl: TEMPLATE_DEFAULTS.defaultImage
  });

  // --- ACTIONS ---
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: params.templateId, // Use the actual ID from URL
          mode: 'hd', // We want the clean version
          data: data
        }),
      });

      const result = await response.json();
      if (result.success) {
        setGeneratedUrl(result.url);
      } else {
        alert("Error: " + result.error);
      }
    } catch (e) {
      alert("Failed to generate.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* 1. HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/templates" className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <ArrowLeft size={20} />
           </Link>
           <div>
             <h1 className="text-sm font-bold text-gray-900">Editing: {TEMPLATE_DEFAULTS.title}</h1>
             <p className="text-xs text-gray-500">{params.templateId}</p>
           </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-70"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          {isGenerating ? 'Rendering...' : 'Download HD'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 p-6 lg:p-10 h-[calc(100vh-64px)]">
        
        {/* 2. LEFT PANEL: INPUTS */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <RefreshCw size={18} className="text-blue-600" /> Customize Text
              </h2>
              
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Business Name</label>
                 <input 
                   type="text" 
                   value={data.businessName}
                   onChange={e => setData({...data, businessName: e.target.value})}
                   className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                 />
              </div>

              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Main Offer / Headline</label>
                 <input 
                   type="text" 
                   value={data.offer}
                   onChange={e => setData({...data, offer: e.target.value})}
                   className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                 />
              </div>

              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                 <input 
                   type="text" 
                   value={data.phone}
                   onChange={e => setData({...data, phone: e.target.value})}
                   className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                 />
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Color Theme</h2>
              <div className="flex gap-3">
                 {['blue', 'red', 'green', 'purple'].map(c => (
                   <button
                     key={c}
                     onClick={() => setData({...data, color: c})}
                     className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${data.color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                     style={{ backgroundColor: c === 'blue' ? '#3B82F6' : c === 'red' ? '#EF4444' : c === 'green' ? '#22C55E' : '#A855F7' }}
                   />
                 ))}
              </div>
           </div>
        </div>

        {/* 3. RIGHT PANEL: LIVE PREVIEW */}
        <div className="lg:col-span-8 flex items-center justify-center bg-gray-100 rounded-3xl border border-gray-200 relative overflow-hidden">
           
           {/* Background Mesh (Aesthetic) */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
           />

           {/* The Preview Canvas (Mimics the Puppeteer HTML) */}
           {/* Note: We scale this down with CSS transform to fit screen */}
           <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white scale-[0.4] md:scale-[0.6] lg:scale-[0.7] transition-transform origin-center"
                style={{ width: '1080px', height: '1350px' }} // Exact dimensions of your poster
           >
              {/* === THIS HTML MUST MATCH src/templates/core.ts EXACTLY === */}
              <div className="w-full h-full flex flex-col relative">
                 <img src={data.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="bg" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
                 
                 <div className="relative z-10 flex flex-col h-full justify-between p-12 text-white">
                    <div className="flex justify-between items-center">
                       <h2 className="text-4xl font-bold tracking-wider uppercase">{data.businessName}</h2>
                       <div className="bg-white text-black px-6 py-2 font-bold rounded-full text-xl">NEW ARRIVAL</div>
                    </div>

                    <div className="mb-12">
                       <h1 className="text-8xl font-black mb-4 leading-tight">{data.offer}</h1>
                       {/* Tailwind dynamic colors don't work with string interpolation usually, so we use style here for safety in preview */}
                       <div className="w-32 h-2 mb-6" style={{ backgroundColor: data.color === 'blue' ? '#3B82F6' : data.color === 'red' ? '#EF4444' : data.color === 'green' ? '#22C55E' : '#A855F7' }}></div>
                       <p className="text-3xl font-medium flex items-center gap-4">
                          <span>📞 Order Now:</span>
                          <span className="font-bold" style={{ color: data.color === 'blue' ? '#60A5FA' : data.color === 'red' ? '#F87171' : data.color === 'green' ? '#4ADE80' : '#C084FC' }}>
                            {data.phone}
                          </span>
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Mobile Phone Frame Overlay (Optional Visual Flair) */}
           <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-gray-600 flex items-center gap-2 shadow-sm border border-white/50">
             <Smartphone size={14} /> Live Preview
           </div>

        </div>
      </div>

      {/* 4. SUCCESS MODAL (When Download is ready) */}
      {generatedUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Poster Ready!</h2>
              <p className="text-gray-500 mb-6 text-sm">Your high-resolution image has been generated.</p>
              
              <div className="space-y-3">
                <a 
                  href={generatedUrl} 
                  target="_blank"
                  rel="noreferrer" // Security best practice
                  download="poster.jpg"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20"
                >
                  Download Image
                </a>
                <button 
                  onClick={() => setGeneratedUrl('')}
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-bold transition"
                >
                  Edit More
                </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}