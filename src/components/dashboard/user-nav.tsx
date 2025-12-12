'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  LogOut, User, Settings, CreditCard, 
  HelpCircle, ChevronDown, Sparkles 
} from 'lucide-react';
import Image from 'next/image';

export function UserNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe Fallbacks
  const userImage = session?.user?.image;
  const username = session?.user?.name || "Entrepreneur";
  const email = session?.user?.email || "";
  // In a real app, these would come from the session too
  const businessName = "My Business"; 

  return (
    <div className="relative" ref={menuRef}>
      
      {/* 1. THE TRIGGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 overflow-hidden relative flex items-center justify-center">
          {userImage ? (
            <Image src={userImage} alt="Profile" fill className="object-cover" />
          ) : (
            <span className="text-blue-700 font-bold text-xs">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 2. THE DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header: Business Info */}
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xl shadow-sm">
                 👜
               </div>
               <div>
                 <h4 className="font-bold text-gray-900 leading-tight">{businessName}</h4>
                 <p className="text-xs text-gray-500 truncate max-w-[140px]">{email}</p>
               </div>
            </div>
          </div>

          {/* Usage Stats (Outstanding Idea) */}
          <div className="px-4 py-3 border-b border-gray-100">
             <div className="flex justify-between text-xs mb-1.5">
               <span className="font-medium text-gray-600">Free Downloads</span>
               <span className="font-bold text-blue-600">3 / 5</span>
             </div>
             <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[60%] rounded-full" />
             </div>
             <button className="w-full mt-3 text-xs bg-gray-900 text-white py-1.5 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-black transition">
                <Sparkles size={12} /> Upgrade to Pro
             </button>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link 
              href="/settings" 
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} /> My Profile
            </Link>
            <Link 
              href="/billing" 
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard size={16} /> Billing & Plans
            </Link>
            <Link 
              href="/settings" 
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} /> Settings
            </Link>
            
            <a 
              href="https://wa.me/254700000000" 
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <HelpCircle size={16} /> Help on WhatsApp
            </a>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-gray-100">
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>

        </div>
      )}
    </div>
  );
}