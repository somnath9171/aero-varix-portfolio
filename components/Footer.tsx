import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0f] py-8 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FF3131] rounded-sm transform rotate-45 flex items-center justify-center">
                <span className="transform -rotate-45 font-bold text-white text-[10px]">AV</span>
            </div>
            <span className="text-white font-bold text-sm">Aero Varix</span>
        </div>
        
        <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>
        
        <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};