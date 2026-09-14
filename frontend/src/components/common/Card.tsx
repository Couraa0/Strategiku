import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: 'glass' | 'solid' | 'gradient';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false,
  variant = 'glass' 
}) => {
  const baseStyle = variant === 'glass' 
    ? 'glass-panel rounded-2xl p-6 border border-slate-200/90 shadow-sm'
    : variant === 'gradient'
    ? 'bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/30 rounded-2xl p-6 border border-sky-100 shadow-md'
    : 'bg-white rounded-2xl p-6 border border-slate-200 shadow-sm';

  const hoverStyle = hoverable 
    ? 'glass-panel-hover hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer transition-all duration-300' 
    : '';

  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
};
