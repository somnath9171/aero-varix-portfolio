import React from 'react';
import { Button } from './Button';
import { Twitter, Instagram, Dribbble, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#0b0b11] relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF3131] rounded-full opacity-5 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00BFFF] rounded-full opacity-5 blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-[#15151a] rounded-[2.5rem] p-8 md:p-20 border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF3131] via-purple-500 to-[#00BFFF]"></div>
            
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
                
                {/* Info */}
                <div>
                    <span className="text-[#FF3131] font-bold tracking-widest uppercase text-sm mb-2 block">Get In Touch</span>
                    <h2 className="text-5xl font-black text-white mb-8 leading-tight">Let's Create <br/>Something <span className="text-[#FF3131]">Epic</span></h2>
                    <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                        Interested in commissioning a piece or discussing a collaboration? 
                        Fill out the form or reach out via social media.
                    </p>
                    
                    <div className="space-y-6 mb-12">
                         <div className="flex items-center gap-5 text-white hover:text-[#FF3131] transition-colors cursor-pointer group">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FF3131] group-hover:bg-[#FF3131]/10 transition-all">
                                <Mail size={24} />
                            </div>
                            <span className="font-bold text-lg">hello@aerovarix.design</span>
                         </div>
                    </div>

                    <div className="flex gap-5">
                        {[Twitter, Instagram, Dribbble].map((Icon, idx) => (
                            <a key={idx} href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#FF3131] hover:border-[#FF3131] transition-all transform hover:-translate-y-1">
                                <Icon size={22} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-[#00BFFF] tracking-widest ml-1">Your Name</label>
                        <input type="text" className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00BFFF] transition-all placeholder:text-gray-600 font-medium" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-[#00BFFF] tracking-widest ml-1">Email Address</label>
                        <input type="email" className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00BFFF] transition-all placeholder:text-gray-600 font-medium" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-[#00BFFF] tracking-widest ml-1">Message</label>
                        <textarea rows={4} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-5 text-white focus:outline-none focus:border-[#00BFFF] transition-all placeholder:text-gray-600 font-medium" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <Button variant="primary" className="w-full py-5 text-lg">Send Message</Button>
                </form>

            </div>
        </div>
      </div>
    </section>
  );
};