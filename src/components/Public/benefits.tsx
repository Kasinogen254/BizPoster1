import { Check } from "lucide-react";
import { BENEFITS_LIST } from "@/src/config/landing-data";

export function Benefits() {
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
            {BENEFITS_LIST.map((item, idx) => (
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
                    <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
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
}