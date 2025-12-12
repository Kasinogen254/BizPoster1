'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateProfile } from '@/src/actions/settings';
import { Loader2, Save, User, Building2, LayoutGrid, X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const INDUSTRIES = [
  "Fashion & Beauty", "Electronics & Tech", "Food & Dining", "Professional Services", "Other"
];

export default function SettingsPage() {
  const { data: session, update } = useSession(); 
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    businessName: session?.user?.name || '', 
    industry: 'Fashion & Beauty', 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage("Profile updated successfully!");
      await update(); 
      router.refresh();
    } else {
      setMessage("Error: " + result.error);
    }
    setIsLoading(false);
  };

  return (
    // FORCE Light Mode Background
    <div className="min-h-screen bg-transparent text-gray-900 relative z-20">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between shadow-xs">
         <div className="flex items-center gap-4">
            <Link 
              href="/templates" 
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors md:hidden"
            >
               <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
         </div>

         {/* THE ESCAPE BUTTON (X) */}
         <Link 
            href="/templates"
            className="group flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all font-medium text-sm"
         >
            <span className="hidden sm:inline">Close</span>
            <div className="bg-white p-1 rounded-full group-hover:scale-110 transition-transform">
               <X size={14} />
            </div>
         </Link>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-2xl mx-auto py-12 px-4">
        
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Header Card */}
          <div className="p-8 border-b border-gray-100 bg-linear-to-r from-blue-50/50 to-transparent flex flex-col sm:flex-row items-center gap-6">
             <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                {/* Online Badge */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
             </div>
             
             <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900">{session?.user?.email}</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your business identity here.</p>
             </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            <div className="grid gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Building2 size={18} className="text-blue-600" /> Business Name
                    </label>
                    <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50 focus:bg-white font-medium"
                    placeholder="e.g. John's Shoes"
                    />
                    <p className="text-xs text-gray-400 pl-1">This will appear on your generated posters.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <LayoutGrid size={18} className="text-blue-600" /> Industry
                    </label>
                    <div className="relative">
                        <select 
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 focus:bg-white font-medium appearance-none"
                        >
                        {INDUSTRIES.map(ind => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <ArrowLeft size={16} className="-rotate-90" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Type (Read Only) */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between opacity-80">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-600">
                        <User size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">Current Plan</p>
                        <p className="font-bold text-gray-900">Free Starter</p>
                    </div>
                </div>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">
                    Upgrade
                </button>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-in slide-in-from-bottom-2 ${message.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                {message.includes("Error") ? <X size={18} /> : <Save size={18} />}
                {message}
                </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
                <Link href="/templates" className="text-gray-500 font-medium hover:text-gray-800 transition">
                    Cancel
                </Link>
                <button
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-gray-200 flex items-center gap-2 disabled:opacity-70 transition-all transform active:scale-95"
                >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
                Save Changes
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}