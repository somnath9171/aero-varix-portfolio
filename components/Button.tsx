import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "btn-shimmer px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 active:duration-75 transform hover:-translate-y-1 active:translate-y-0 focus:outline-none relative overflow-hidden";
  
  const variants = {
    primary: "bg-[#FF3131] text-white shadow-lg hover:shadow-xl hover:bg-[#FF3131] active:text-black",
    secondary: "bg-[#00BFFF] text-white shadow-lg hover:shadow-xl hover:bg-[#33ccff]",
    outline: "bg-transparent text-white border-2 border-[#FF3131] hover:bg-[#FF3131] hover:text-white hover:shadow-lg",
    ghost: "bg-transparent text-white hover:text-[#FF3131] hover:bg-white/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};