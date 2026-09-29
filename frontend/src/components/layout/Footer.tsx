import React from 'react';
import { Sparkles, ShieldCheck, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-5 px-8 mt-auto text-xs text-slate-500 font-sans" role="contentinfo">
      <div className="max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left — Brand & Copyright */}
        <div className="flex items-center gap-3">
          <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-8 w-auto object-contain" />
          <span className="text-slate-600 font-medium border-l border-slate-200 pl-3">
            © 2026 <span className="font-bold text-slate-800">Strategiku</span> — UMKM Growth Intelligence
          </span>
        </div>

        {/* Center/Right Status & Support */}
        <div className="flex items-center gap-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </div>
          <span className="hidden md:flex items-center gap-1 text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-sky-500" /> Supabase Secured
          </span>
          <a
            href="mailto:Muhammadrakhasyamputra@gmail.com"
            className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 transition-colors font-semibold"
          >
            <Mail className="w-4 h-4" />
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};
