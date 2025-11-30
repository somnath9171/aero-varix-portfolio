import React from 'react';
import { Award, Layers, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-32 bg-[#0a0a0f] relative border-t border-white/5 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00BFFF] rounded-full opacity-5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
            
            {/* Image Side */}
            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF3131] to-[#00BFFF] rounded-full opacity-20 blur-3xl"></div>
                <div className="relative rounded-full overflow-hidden border-4 border-[#1a1a20] aspect-square max-w-md mx-auto shadow-2xl">
                    <img 
                        src="https://picsum.photos/800/800?random=50" 
                        alt="Profile" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                
                {/* Floating Stats */}
                <div className="absolute top-10 right-0 md:-right-6 bg-[#15151a]/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl animate-float-delayed">
                    <Award className="text-[#FF3131] mb-3" size={36} />
                    <p className="text-4xl font-black text-white">5+</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Years Exp.</p>
                </div>
            </div>

            {/* Text Side */}
            <div className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none">
                    Behind the <br/> <span className="text-[#00BFFF]">Digital Art</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed font-medium border-l-2 border-[#00BFFF] pl-6">
                    I am a digital artist and visual designer obsessed with the intersection of technology and creativity. 
                    My work explores futuristic themes, blending 3D rendering with illustrative styles to create unique digital assets for the blockchain era.
                </p>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-[#FF3131] transition-all duration-300 group hover:-translate-y-1">
                        <Layers className="text-[#FF3131] mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-white font-bold mb-2 text-xl">Multidisciplinary</h4>
                        <p className="text-gray-400 text-sm font-medium">3D, UI/UX, & Illustration</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-[#00BFFF] transition-all duration-300 group hover:-translate-y-1">
                        <Users className="text-[#00BFFF] mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-white font-bold mb-2 text-xl">Community First</h4>
                        <p className="text-gray-400 text-sm font-medium">Building for the Web3 space</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};