import { STEPS_DATA } from "@/src/config/landing-data";

export function HowItWorks() {
    return (
       <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">Create in 3 Simple Steps</h2>
        <div className="grid md:grid-cols-3 gap-12">
            {STEPS_DATA.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-sm">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 max-w-xs mx-auto leading-relaxed">{step.desc}</p>
                </div>
              );
            })}

        </div>
      </div>
    </section> 
    );
}