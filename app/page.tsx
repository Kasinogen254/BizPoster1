'use client';

import { useState, useEffect } from 'react';
import { 
  Menu, X, Check, Download, Layers, Zap, ArrowRight, Star 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- DATA & CONFIG ---

const NAV_LINKS = [
  { name: 'Templates', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Login', href: '#' },
];

const STEPS = [
  { 
    icon: <Layers size={28} />, 
    title: "1. Choose a Template", 
    desc: "Pick from hundreds of professionally designed layouts tailored for Kenyan businesses." 
  },
  { 
    icon: <Check size={28} />, 
    title: "2. Enter Your Info", 
    desc: "Type your product name, price, and upload your logo. The design updates instantly." 
  },
  { 
    icon: <Download size={28} />, 
    title: "3. Download & Post", 
    desc: "Get a high-quality image ready for your WhatsApp Status, Instagram, or TikTok." 
  },
];

const BENEFITS = [
  "Super Fast Generation", 
  "No Design Skills Needed", 
  "Auto-Customized Posters", 
  "WhatsApp & TikTok Ready",
  "High Quality Downloads", 
  "Perfect for Agents"
];

const PRICING_PLANS = [
  {
    name: "Free Plan",
    price: "Ksh 0",
    desc: "Limited templates with watermark.",
    action: "Get Started",
    highlight: false,
  },
  {
    name: "Weekly",
    price: "Ksh 99",
    desc: "Full access for 7 days. No watermarks.",
    action: "Select Plan",
    highlight: true,
  },
  {
    name: "Monthly",
    price: "Ksh 299",
    desc: "Best value for regular sellers.",
    action: "Select Plan",
    highlight: false,
  },
];

// --- COMPONENTS ---

const Navbar = () => {
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
            href="#" 
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
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6">
            <Zap size={14} className="fill-current" /> New Features Live
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Create Custom Posters <br />
            <span className="text-blue-600">in Seconds.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
            No design skills needed. Generate marketing posters instantly — perfect for agents, sellers & small businesses in Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Creating <ArrowRight size={20} />
            </button>
            <button className="border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition flex items-center justify-center">
              Browse Templates
            </button>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="relative h-[400px] md:h-[500px] w-full hidden lg:block">
           {/* Blob */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 blur-3xl rounded-full -z-10" />
           
           {/* Cards Container */}
           <div className="relative w-full h-full">
              {/* Card 1 */}
              <div className="absolute top-0 right-10 w-48 h-72 bg-white shadow-2xl rounded-lg overflow-hidden transform rotate-6 hover:rotate-0 transition duration-500 z-10 border border-gray-100">
                <Image src="/Image 1.jpeg" alt="Sale Poster" width={300} height={450} className="object-cover w-full h-full" />
              </div>
              {/* Card 2 (Center Main) */}
              <div className="absolute top-10 left-10 w-60 h-80 bg-white shadow-2xl rounded-lg overflow-hidden transform -rotate-3 hover:scale-105 transition duration-500 z-20 border border-gray-100">
                 <Image src="/Image 2.jpeg" alt="Event Poster" width={300} height={450} className="object-cover w-full h-full" />
              </div>
              {/* Card 3 */}
              <div className="absolute bottom-10 right-20 w-52 h-64 bg-white shadow-2xl rounded-lg overflow-hidden transform rotate-12 hover:rotate-6 transition duration-500 z-10 border border-gray-100">
                 <Image src="/Image 3.jpeg" alt="Hiring Poster" width={300} height={450} className="object-cover w-full h-full" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">Create in 3 Simple Steps</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 max-w-xs mx-auto leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedTemplates = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Inspiration</span>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">Trending Templates</h2>
          </div>
          <Link href="#" className="hidden md:flex text-blue-600 font-semibold items-center hover:underline">
            View All Templates <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[4, 5, 6].map((i) => (
            <div key={i} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded z-10">
                    Real Estate
                </div>
                <Image 
                  src={`/templates/Image${i}.jpeg`} 
                  alt="Template" 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4 flex justify-between items-center bg-white">
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-gray-600 font-medium">4.8</span>
                </div>
                <button className="bg-gray-900 text-white text-xs px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 bg-white hover:bg-gray-50">
            Browse All Templates
          </button>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why BizPoster?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Stop spending hours on Canva or money on designers. We built this for people who need to sell, not design.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 relative order-1 lg:order-2">
             <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-lg rotate-12 shadow-lg z-10 text-sm">
                Easy Peasy! 🍋
             </div>
             {/* Mockup UI */}
             <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="w-full">
                        <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-gray-100 rounded" />
                    </div>
                </div>
                <div className="aspect-video bg-blue-50 rounded-lg flex items-center justify-center text-blue-300 border-2 border-dashed border-blue-200">
                    Poster Preview Area
                </div>
             </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-24 bg-gray-50 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Affordable Pricing</h2>
        <p className="text-gray-600 mb-12">Start for free, upgrade when you need more power.</p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left">
           {PRICING_PLANS.map((plan, idx) => (
             <div 
                key={idx} 
                className={`bg-white p-8 rounded-2xl shadow-sm border ${
                  plan.highlight 
                    ? 'border-blue-600 shadow-xl relative transform md:-translate-y-4' 
                    : 'border-gray-200'
                }`}
             >
                {plan.highlight && (
                   <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      POPULAR
                   </div>
                )}
                <h3 className={`font-bold text-lg mb-2 ${plan.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                    {plan.name}
                </h3>
                <p className="text-3xl font-bold mb-4 text-gray-900">{plan.price}</p>
                <p className="text-sm text-gray-500 mb-8">{plan.desc}</p>
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.action}
                </button>
             </div>
           ))}
        </div>

        <Link href="#" className="inline-block mt-12 text-gray-600 font-medium hover:text-blue-600 underline underline-offset-4">
            View Full Pricing Table
        </Link>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Loved by Kenyan Sellers</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
            {/* Card 1 - WhatsApp Style */}
            <div className="bg-green-50 p-6 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none max-w-sm w-full shadow-sm border border-green-100">
                <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                    "BizPoster saves me 20 minutes every morning. I can post 5 ads on my Status before I even drink my tea."
                </p>
                <div className="flex items-center justify-between border-t border-green-200/50 pt-4">
                    <span className="font-bold text-xs text-gray-900">Safaricom Agent</span>
                    <span className="text-xs text-gray-500">10:42 AM</span>
                </div>
            </div>
             {/* Card 2 - Standard */}
             <div className="bg-gray-100 p-6 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none max-w-sm w-full shadow-sm md:mt-12">
                <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                    "The templates look professional. My customers actually think I hired a designer."
                </p>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="font-bold text-xs text-gray-900">Boutique Owner, Nairobi</span>
                    <span className="text-xs text-gray-500">11:15 AM</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
        
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Link href="/" className="text-2xl font-bold text-white block mb-6">
            Biz<span className="text-blue-600">Poster</span>.
          </Link>
          <p className="mb-6 leading-relaxed">Empowering small businesses with instant, professional marketing tools. Made with ❤️ in Nairobi.</p>
          <div className="flex gap-4">
             {/* Social Placeholders */}
             {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer flex items-center justify-center">
                    <span className="sr-only">Social Link</span>
                </div>
             ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Product</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:text-white transition">Templates</Link></li>
            <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white transition">Features</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
            <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs">
        &copy; {new Date().getFullYear()} BizPoster Kenya. All rights reserved.
      </div>
    </footer>
  );
};

// --- MAIN PAGE LAYOUT ---

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedTemplates />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}