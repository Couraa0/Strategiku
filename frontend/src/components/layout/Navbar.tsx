import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-800">Skripsi App</div>
      <div className="flex gap-4">
        <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
        <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
      </div>
    </nav>
  );
};
