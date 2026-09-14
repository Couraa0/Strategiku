import React from 'react';
import { Sparkles, ShieldCheck, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm py-4 px-6 mt-8 text-xs text-slate-500 font-sans" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left — Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-600 font-medium">
            © 2026 <span className="font-bold text-slate-800">APH YAH</span> — UMKM Growth Intelligence
          </span>
        </div>

        {/* Center — Status */}
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </div>
          <span className="hidden sm:flex items-center gap-1 text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-500" /> Supabase Secured
          </span>
        </div>

        {/* Right — Contact shortcut */}
        <a
          href="mailto:Muhammadrakhasyamputra@gmail.com"
          className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 transition-colors font-medium"
        >
          <Mail className="w-3.5 h-3.5" />
          Support
        </a>
      </div>
    </footer>
  );
};
