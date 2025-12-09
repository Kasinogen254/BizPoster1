import { Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-linear-to-b from-blue-50/50 to-white">
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
}