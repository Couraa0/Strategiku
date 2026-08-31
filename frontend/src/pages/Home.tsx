import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Selamat Datang di Aplikasi Skripsi
        </h1>
        <p className="text-gray-600 mb-6">
          Gunakan aplikasi ini untuk memantau, mengelola, dan mengintegrasikan frontend dengan backend Express dan database Supabase.
        </p>
        <div className="flex gap-4">
          <Button variant="primary" onClick={() => window.location.href = '/login'}>
            Masuk / Login
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/dashboard'}>
            Buka Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};
