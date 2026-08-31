import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto mt-12 p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Utama</h1>
            <p className="text-gray-600">
              Halo, {user?.email || 'Tamu / Belum Login'}
            </p>
          </div>
          {user && (
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Keluar
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
