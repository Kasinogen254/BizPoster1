'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, ShoppingBag, Smartphone, ChevronRight, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { completeOnboarding } from '@/src/actions/onboarding';

// ... (Keep INDUSTRIES array exactly as it is) ...
const INDUSTRIES = [
  { id: 'Fashion & Beauty', label: 'Fashion & Beauty', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', color: 'bg-pink-500' },
  { id: 'Electronics & Tech', label: 'Electronics & Tech', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80', color: 'bg-blue-600' },
  { id: 'Food & Dining', label: 'Food & Dining', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', color: 'bg-orange-500' },
  { id: 'Professional Services', label: 'Professional Services', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', color: 'bg-slate-800' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState(''); // New Error State
  
  const [bizName, setBizName] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);

  const handleFinish = async () => {
    setIsBuilding(true);
    setError('');

    const result = await completeOnboarding({
      businessName: bizName,
      industry: industry.id
    });

    if (result.error) {
      // Replaces the alert()
      setError("Something went wrong saving your profile. Please try again.");
      setIsBuilding(false);
      return;
    }

    setTimeout(() => {
      router.refresh(); 
      router.push('/templates');
    }, 2000);
  };

  // ... (Keep Loading Screen exactly as it is) ...
  if (isBuilding) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-600">
             {Math.floor(Math.random() * 100)}%
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-gray-900">Setting up your shop...</h2>
        <p className="text-gray-500 mt-2">Curating high-converting {industry.label} templates.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* --- LEFT: QUESTIONS --- */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative">
        
        <div className="absolute top-10 left-8 md:left-24 right-8 md:right-24 h-1 bg-gray-100 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-black"
             initial={{ width: "0%" }}
             animate={{ width: step === 1 ? "30%" : step === 2 ? "60%" : "100%" }}
           />
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1 & 2 REMAIN THE SAME, I WILL JUST SHOW STEP 3 CHANGES */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
               <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Step 1 of 3</span>
               <h1 className="text-4xl font-bold text-gray-900">What is your <br />Business Name?</h1>
               <p className="text-gray-500 text-lg">This will appear on your posters automatically.</p>
               
               <input 
                 autoFocus
                 type="text"
                 value={bizName}
                 onChange={(e) => setBizName(e.target.value)}
                 placeholder="e.g. Mama Mboga Fresh"
                 className="w-full text-2xl border-b-2 border-gray-200 py-3 focus:border-black outline-none bg-transparent placeholder-gray-300 font-medium transition-colors"
               />

               <div className="pt-8">
                 <button 
                   onClick={() => setStep(2)}
                   disabled={bizName.length < 2}
                   className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                 >
                   Next Step <ArrowRight size={20} />
                 </button>
               </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
               <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Step 2 of 3</span>
               <h1 className="text-4xl font-bold text-gray-900">What do you sell?</h1>
               
               <div className="grid grid-cols-1 gap-3">
                 {INDUSTRIES.map((ind) => (
                   <button
                     key={ind.id}
                     onClick={() => setIndustry(ind)}
                     className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                       ${industry.id === ind.id 
                         ? 'border-black bg-gray-50 shadow-md' 
                         : 'border-gray-100 hover:border-gray-300'}`}
                   >
                     <div className={`w-12 h-12 rounded-lg ${ind.color} text-white flex items-center justify-center shrink-0`}>
                        <ShoppingBag size={20} />
                     </div>
                     <div>
                       <h3 className="font-bold text-gray-900">{ind.label}</h3>
                     </div>
                     {industry.id === ind.id && <Check className="ml-auto text-black" />}
                   </button>
                 ))}
               </div>

               <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(1)} className="text-gray-500 font-medium hover:text-black">Back</button>
                 <button 
                   onClick={() => setStep(3)}
                   className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform"
                 >
                   Next Step <ArrowRight size={20} />
                 </button>
               </div>
            </motion.div>
          )}

          {step === 3 && (
             <motion.div 
             key="step3"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-6"
           >
              <h1 className="text-4xl font-bold text-gray-900">You are all set! 🚀</h1>
              <p className="text-gray-500 text-lg">We have customized your experience for <span className="text-black font-bold">{industry.label}</span>.</p>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Check size={24} />
                 </div>
                 <div>
                    <p className="font-bold text-gray-900">Free Plan Activated</p>
                    <p className="text-sm text-gray-500">7 Days of Premium Templates</p>
                 </div>
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                   <AlertCircle size={16} /> {error}
                </div>
              )}

              <button 
                onClick={handleFinish}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xl shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Start Creating <ChevronRight size={24} />
              </button>
              
              <button onClick={() => setStep(2)} className="w-full text-center text-gray-400 text-sm mt-4 hover:text-gray-600">
                Go back to changes
              </button>
           </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* --- RIGHT: LIVE PREVIEW --- */}
      <div className="hidden lg:flex bg-gray-50 items-center justify-center relative overflow-hidden">
         <motion.div 
           key={industry.image}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.1 }}
           transition={{ duration: 1 }}
           className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: `url(${industry.image})` }}
         />
         
         <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20" />
            
            <div className="relative h-full w-full bg-white flex flex-col">
               <div className="h-2/3 relative">
                  <img 
                    src={industry.image} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                     <motion.h2 
                       className="text-white text-3xl font-bold uppercase tracking-wider mb-2"
                       initial={{ scale: 0.9 }}
                       animate={{ scale: 1 }}
                       key={bizName} 
                     >
                       {bizName || "YOUR BRAND"}
                     </motion.h2>
                     <div className="w-16 h-1 bg-white mb-4" />
                     <p className="text-white/90 text-sm font-medium uppercase tracking-widest">
                       {industry.label.split('&')[0]} Collection
                     </p>
                     <div className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold text-sm">
                        SALE NOW ON
                     </div>
                  </div>
               </div>

               <div className="flex-1 bg-white p-4">
                  <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${industry.color}`} />
                        <div className="text-xs font-bold text-gray-800">{bizName || "User"}</div>
                     </div>
                     <Smartphone size={16} className="text-gray-400" />
                  </div>
                  <div className="space-y-2">
                     <div className="h-2 bg-gray-100 rounded w-3/4" />
                     <div className="h-2 bg-gray-100 rounded w-1/2" />
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                     <p className="text-[10px] text-blue-600 font-medium text-center">
                        👆 Live Preview: See how your brand looks instantly.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}