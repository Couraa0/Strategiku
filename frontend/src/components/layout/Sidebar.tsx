import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  UploadCloud,
  Receipt,
  TrendingUp,
  Sparkles,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  Award,
  ChevronLeft,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const { user, business, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderNavLink = (
    to: string,
    Icon: React.ElementType,
    label: string,
    badge?: string,
    iconColor = 'text-slate-500'
  ) => (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `group flex items-center ${
          collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3.5 py-2.5'
        } rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 font-semibold'
            : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : iconColor}`} />
          {!collapsed && <span className="flex-1 truncate">{label}</span>}
          {!collapsed && badge && (
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-fuchsia-100 text-fuchsia-700'
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
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-white/95 border-r border-slate-200/90 flex flex-col justify-between h-screen fixed left-0 top-0 z-40 backdrop-blur-xl shadow-sm transition-all duration-300`}
    >
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-3 group overflow-hidden">
            {collapsed ? (
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                S
              </div>
            ) : (
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-9 w-auto" />
            )}
          </NavLink>

          {onToggle && (
            <button
              onClick={onToggle}
              title={collapsed ? 'Perluas Sidebar' : 'Minimize Sidebar'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* LANDING PAGE LINK */}
          <button
            onClick={() => navigate('/')}
            title={collapsed ? 'Kembali ke Beranda' : undefined}
            className={`w-full flex items-center ${
              collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3.5 py-2.5'
            } rounded-xl text-sm font-medium transition-all duration-200 text-slate-500 hover:text-sky-600 hover:bg-sky-50/80 border border-dashed border-slate-200 hover:border-sky-300`}
          >
            <Globe className="w-4 h-4 shrink-0 text-sky-500" />
            {!collapsed && <span className="truncate">Kembali ke Beranda</span>}
          </button>

          {/* MAIN */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                MAIN MENU
              </p>
            )}
            <nav className="space-y-1">
              {renderNavLink('/dashboard', LayoutDashboard, 'Dashboard', undefined, 'text-sky-500')}
              {renderNavLink('/business-profile', Building2, 'Business Profile', undefined, 'text-slate-500')}
              {renderNavLink('/business-data', UploadCloud, 'Business Data', undefined, 'text-slate-500')}
              {renderNavLink('/transactions', Receipt, 'Transactions', undefined, 'text-slate-500')}
            </nav>
          </div>

          {/* INTELLIGENCE */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                INTELLIGENCE ENGINES
              </p>
            )}
            <nav className="space-y-1">
              {renderNavLink('/insights', TrendingUp, 'Business Insights', undefined, 'text-sky-500')}
              {renderNavLink('/recommendations', Sparkles, 'Recommendations', 'AI', 'text-indigo-500')}
              {renderNavLink('/assistant', MessageSquare, 'AI Assistant', undefined, 'text-teal-500')}
            </nav>
          </div>

          {/* DATA */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                KNOWLEDGE & HUB
              </p>
            )}
            <nav className="space-y-1">
              {renderNavLink('/umkm-hub-input', Award, 'UMKM Hub', undefined, 'text-amber-500')}
              {renderNavLink('/knowledge', BookOpen, 'Knowledge Base', undefined, 'text-slate-500')}
            </nav>
          </div>

          {/* SETTINGS */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                SYSTEM
              </p>
            )}
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
            <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              {user?.name?.slice(0, 2).toUpperCase() || 'UM'}
            </div>
            {!collapsed && (
              <div className="truncate">
                <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'UMKM Owner'}</p>
                <p className="text-[10px] text-sky-600 font-medium truncate">{business?.name || 'Kopi Karawang'}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
