import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Business } from '../types';
import api from '../lib/api';

interface AuthContextType {
  user: User | null;
  business: Business | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password: string, businessName?: string) => Promise<void>;
  logout: () => void;
  updateUserBusiness: (businessData: Partial<Business>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('aph_yah_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res: any = await api.get('/auth/me');
        if (res.success && res.data) {
          setUser(res.data);
          setBusiness(res.data.business || null);
        }
      } catch (err) {
        localStorage.removeItem('aph_yah_token');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email = 'demo@aphyah.id', password = 'Demo123!') => {
    setIsLoading(true);
    try {
      const res: any = await api.post('/auth/login', { email, password });
      if (res.success && res.data) {
        localStorage.setItem('aph_yah_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        if (res.data.user.business) {
          setBusiness(res.data.user.business);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, businessName?: string) => {
    setIsLoading(true);
    try {
      const res: any = await api.post('/auth/register', { name, email, password, business_name: businessName });
      if (res.success && res.data) {
        localStorage.setItem('aph_yah_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('aph_yah_token');
    setToken(null);
    setUser(null);
    setBusiness(null);
  };

  const updateUserBusiness = (businessData: Partial<Business>) => {
    if (business) {
      setBusiness({ ...business, ...businessData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        business,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserBusiness,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
