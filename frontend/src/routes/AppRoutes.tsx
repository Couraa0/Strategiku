import React from 'react';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

export const AppRoutes: React.FC = () => {
  // Simple custom routing implementation (or you can use react-router-dom)
  const path = window.location.pathname;

  switch (path) {
    case '/':
      return <Home />;
    case '/login':
      return <Login />;
    case '/dashboard':
      return <Dashboard />;
    default:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <p className="text-gray-600">Halaman Tidak Ditemukan</p>
          <a href="/" className="mt-4 text-blue-500 hover:underline">Kembali ke Home</a>
        </div>
      );
  }
};
