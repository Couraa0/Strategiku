import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-20 bg-slate-800/50 rounded-2xl border border-slate-700/40 w-full" />
      ))}
    </div>
  );
};
