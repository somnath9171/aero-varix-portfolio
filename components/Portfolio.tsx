import React from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { ExternalLink } from 'lucide-react';

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 bg-[#0b0b11]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20">
           <span className="text-[#00BFFF] font-bold tracking-widest uppercase text-sm mb-4">Explore Our Work</span>
           <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-center">
             Selected <span className="text-[#FF3131]">Works</span>
           </h2>
           <div className="h-1.5 w-32 bg-[#FF3131] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item) => (
                <div key={item.id} className="group relative rounded-2xl cursor-pointer">
                    
                    <div className="relative aspect-square bg-[#15151a] rounded-2xl overflow-hidden border border-white/5 group-hover:border-[#00BFFF]/50 transition-colors">
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                            <span className="text-[#00BFFF] font-black text-xs uppercase tracking-widest mb-2">{item.category}</span>
                            <h3 className="text-white text-3xl font-black mb-6 leading-none">{item.title}</h3>
                            <div className="flex items-center gap-3 text-white font-bold uppercase text-sm tracking-wide group-hover:gap-5 transition-all">
                                View Project <ExternalLink size={18} className="text-[#FF3131]" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-20 text-center">
            <button className="btn-shimmer px-12 py-5 border border-[#00BFFF] text-[#00BFFF] font-bold rounded-full hover:bg-[#00BFFF] hover:text-white transition-all uppercase tracking-widest text-sm relative overflow-hidden">
                <span className="relative z-10">View All Projects</span>
            </button>
        </div>
      </div>
    </section>
  );
};