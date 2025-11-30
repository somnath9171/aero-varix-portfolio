import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-5 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 bg-[#FF3131] rounded-sm transform rotate-45 flex items-center justify-center">
             <span className="transform -rotate-45 font-bold text-white text-xs">AV</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            Aero <span className="text-[#FF3131]">Varix</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-gray-300 hover:text-[#FF3131] font-medium transition-colors text-sm uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
             <input 
               type="text" 
               placeholder="Search..." 
               className="bg-white/10 text-white rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3131] w-48 transition-all group-hover:bg-white/20"
             />
             <div className="absolute right-1 top-1 bg-[#FF3131] p-1.5 rounded-full text-white cursor-pointer">
               <Search size={14} strokeWidth={3} />
             </div>
          </div>
          
          <Button variant="primary" className="px-6">Contact</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0f] border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-xl font-bold text-white hover:text-[#FF3131]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button variant="primary" className="w-full">Contact</Button>
        </div>
      )}
    </nav>
  );
};