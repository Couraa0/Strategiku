import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'sky' | 'indigo' | 'amber' | 'rose' | 'slate' | 'teal';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'sky', size = 'md', pulse = false }) => {
  const variantStyles = {
    sky: 'bg-sky-100 text-sky-700 border-sky-300 font-semibold shadow-xs',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-300 font-semibold',
    blue: 'bg-blue-100 text-blue-700 border-blue-300 font-semibold',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300 font-semibold',
    amber: 'bg-amber-100 text-amber-700 border-amber-300 font-semibold',
    rose: 'bg-rose-100 text-rose-700 border-rose-300 font-semibold',
    slate: 'bg-slate-100 text-slate-700 border-slate-300 font-medium',
    teal: 'bg-teal-100 text-teal-700 border-teal-300 font-semibold',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-3 py-1 font-semibold tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
      )}
      {children}
    </span>
  );
};
