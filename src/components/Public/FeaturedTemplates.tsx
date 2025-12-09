import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedTemplates() { 
    return (
    <section id="templates" className="py-24 bg-gray-50">
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
              <div className="aspect-4/5 bg-gray-200 overflow-hidden relative">
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
}