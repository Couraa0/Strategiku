import React from 'react';
import { Bell, Search, MapPin, Sparkles, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  title?: string;
  subtitle?: string;
  onToggleMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle, onToggleMobileSidebar }) => {
  const { business } = useAuth();

  return (
    <header className="h-16 sm:h-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-8 shadow-xs">
      {/* Title / Breadcrumb + Mobile Menu Toggle */}
      <div className="flex items-center gap-3 shrink-0 max-w-[65%] sm:max-w-md">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shrink-0"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="truncate">
          <h2 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight truncate">
            {title || 'Dashboard'}
          </h2>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Business Region Tag */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-sky-500" />
          <span>{business?.city_regency || 'Karawang'}, Jawa Barat</span>
        </div>

        {/* Global Search Input */}
        <div className="relative hidden xl:block w-56">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search insights..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
          />
        </div>

        {/* Notification Bell */}
        <button
          className="p-1.5 sm:p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-sky-600 hover:bg-sky-50 relative transition-colors"
          title="Notifikasi"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-sky-500 absolute top-1.5 right-1.5 animate-pulse" />
        </button>

        {/* Growth Mode Tag */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-500/20">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Intelligence Active</span>
          <span className="sm:hidden text-[10px]">Active</span>
        </div>
      </div>
    </header>
  );
};
