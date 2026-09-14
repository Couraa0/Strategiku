import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  UploadCloud,
  Receipt,
  TrendingUp,
  Target,
  Sparkles,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user, business, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderNavLink = (to: string, Icon: React.ElementType, label: string, badge?: string, iconColor = 'text-slate-500') => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 font-semibold translate-x-0.5'
            : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80 hover:translate-x-0.5'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : iconColor}`} />
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white/95 border-r border-slate-200/90 flex flex-col justify-between h-screen fixed left-0 top-0 z-40 backdrop-blur-xl shadow-sm">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-100">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                APH YAH
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold border border-sky-200">
                  GEN-Z
                </span>
              </h1>
              <p className="text-[11px] text-sky-600 font-semibold truncate max-w-[150px]">
                Growth Intelligence
              </p>
            </div>
          </NavLink>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* MAIN */}
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              MAIN MENU
            </p>
            <nav className="space-y-1">
              {renderNavLink('/dashboard', LayoutDashboard, 'Dashboard', undefined, 'text-sky-500')}
              {renderNavLink('/business-profile', Building2, 'Business Profile', undefined, 'text-slate-500')}
              {renderNavLink('/business-data', UploadCloud, 'Business Data', undefined, 'text-slate-500')}
              {renderNavLink('/transactions', Receipt, 'Transactions', undefined, 'text-slate-500')}
            </nav>
          </div>

          {/* INTELLIGENCE */}
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              INTELLIGENCE ENGINES
            </p>
            <nav className="space-y-1">
              {renderNavLink('/insights', TrendingUp, 'Business Insights', undefined, 'text-sky-500')}
              {renderNavLink('/opportunities', Target, 'Opportunities', undefined, 'text-blue-500')}
              {renderNavLink('/recommendations', Sparkles, 'Recommendations', 'AI', 'text-indigo-500')}
              {renderNavLink('/assistant', MessageSquare, 'AI Assistant', undefined, 'text-teal-500')}
            </nav>
          </div>

          {/* DATA */}
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              KNOWLEDGE
            </p>
            <nav className="space-y-1">
              {renderNavLink('/knowledge', BookOpen, 'Knowledge Base', undefined, 'text-slate-500')}
            </nav>
          </div>

          {/* SETTINGS */}
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              SYSTEM
            </p>
            <nav className="space-y-1">
              {renderNavLink('/settings', Settings, 'Settings', undefined, 'text-slate-500')}
            </nav>
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-100 bg-sky-50/50">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {user?.name?.slice(0, 2).toUpperCase() || 'UM'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'UMKM Owner'}</p>
              <p className="text-[10px] text-sky-600 font-medium truncate">{business?.name || 'Kopi Karawang'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
