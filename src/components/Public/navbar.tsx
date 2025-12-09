'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/src/config/landing-data'; 

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
          Biz<span className="text-blue-600">Poster</span>.
        </Link>

        {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

        {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-700 p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>

        {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col p-6 gap-4 animate-in slide-in-from-top-5 duration-200">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-gray-700 font-medium py-2 border-b border-gray-50 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="#" 
                className="bg-blue-600 text-center text-white px-5 py-3 rounded-lg font-medium mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
        )}
    </nav>
  );
}