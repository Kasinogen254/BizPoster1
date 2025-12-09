import { PRICING_PLANS } from '@/src/config/landing-data'; 

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 text-center">
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
      </div>
    </section>
  );
}