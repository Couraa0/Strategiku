import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar title={title} subtitle={subtitle} />
          <main className="ml-64 p-6 flex-1 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </main>
          <div className="ml-64">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
