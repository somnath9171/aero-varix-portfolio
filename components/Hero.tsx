import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#0b0b11]">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00BFFF] rounded-full filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF3131] rounded-full filter blur-[150px] opacity-15"></div>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8 animate-float-delayed">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg hover:border-[#00BFFF]/50 transition-colors cursor-pointer group">
            <span className="w-2 h-2 rounded-full bg-[#FF3131] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">New Collection Dropped</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none drop-shadow-2xl">
            <span className="text-white block">Digital</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3131] to-white">
              Sculpture
            </span>
            <span className="text-[#00BFFF] block text-4xl md:text-6xl mt-4 tracking-tight">
              NFT Collection
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed border-l-4 border-[#FF3131] pl-6">
            NFT is a unit of data stored on a digital ledger called a blockchain that certifies a digital asset to be unique.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button variant="primary" className="flex items-center justify-center gap-2 text-base px-8 py-4 active:!text-black transition-all">
              Start Portfolio <Zap size={18} fill="currentColor" />
            </Button>
          </div>
          
          <div className="flex items-center gap-10 pt-8 border-t border-white/5 mt-8">
             <div>
               <p className="text-3xl font-black text-white">25k+</p>
               <p className="text-xs text-[#00BFFF] uppercase font-bold tracking-wider">Artworks</p>
             </div>
             <div>
               <p className="text-3xl font-black text-white">12k+</p>
               <p className="text-xs text-[#00BFFF] uppercase font-bold tracking-wider">Auctions</p>
             </div>
             <div>
               <p className="text-3xl font-black text-white">10k+</p>
               <p className="text-xs text-[#00BFFF] uppercase font-bold tracking-wider">Artists</p>
             </div>
          </div>
        </div>

        {/* Right Content - 3D Graphic */}
        <div className="relative animate-float h-full min-h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-[600px] aspect-square group">
                {/* Abstract shape background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00BFFF] to-[#FF3131] rounded-full opacity-30 blur-[60px] transform scale-75"></div>
                
                {/* Main Image */}
                <div className="relative z-10 w-full h-full transform transition-transform duration-500 hover:scale-105">
                   <img 
                    src="https://picsum.photos/800/800?random=99" 
                    alt="3D Abstract Character" 
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    style={{
                      clipPath: "polygon(10% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)"
                    }}
                  />
                </div>

                {/* Floating Card UI Element */}
                <div className="absolute -right-6 bottom-24 z-20 bg-[#0b0b11]/90 backdrop-blur-xl p-6 rounded-2xl border border-[#00BFFF]/30 shadow-2xl max-w-[240px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[10px] text-[#00BFFF] font-bold uppercase tracking-wider">Current Bid</p>
                            <p className="text-2xl font-black text-white">2.00 ETH</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center text-xs font-bold text-white">7h</div>
                    </div>
                    <p className="text-base font-bold text-gray-200 mb-4">Render 3D Artwork</p>
                    <Button variant="secondary" className="w-full text-xs py-3">View Artwork</Button>
                </div>
                
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF3131] rounded-full mix-blend-screen filter blur-2xl animate-float-delayed opacity-50"></div>
                <div className="absolute bottom-10 -right-10 w-24 h-24 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-2xl animate-float opacity-50"></div>
            </div>
        </div>

      </div>
    </section>
  );
};