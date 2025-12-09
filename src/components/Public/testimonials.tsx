import React from "react";

export function Testimonials() { 
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
                    &ldquo;BizPoster saves me 20 minutes every morning. I can post 5 ads on my Status before I even drink my tea.&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-green-200/50 pt-4">
                    <span className="font-bold text-xs text-gray-900">Safaricom Agent</span>
                    <span className="text-xs text-gray-500">10:42 AM</span>
                </div>
            </div>
             {/* Card 2 - Standard */}
             <div className="bg-gray-100 p-6 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none max-w-sm w-full shadow-sm md:mt-12">
                <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                    &quot;The templates look professional. My customers actually think I hired a designer.&quot;
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
}