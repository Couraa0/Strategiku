import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title, subtitle }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans flex-col overflow-x-hidden">
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1 relative">
        {/* Responsive Sidebar (Desktop Fixed + Mobile Slide-over) */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 ${
            collapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          <Navbar
            title={title}
            subtitle={subtitle}
            onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)}
          />
          
          <main className="p-3 sm:p-5 md:p-8 flex-1 w-full space-y-6 max-w-full overflow-x-hidden">
            {children}
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};
