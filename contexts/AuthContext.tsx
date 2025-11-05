
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Page } from '../App';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  token: string | null;
  page: Page;
  setPage: (page: Page) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [page, setPage] = useState<Page>('landing');

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Login failed');
    }

    const data = await response.json();
    setToken(data.token);
    setUserEmail(email);
    setPage('app'); // Navigate to the app page on successful login
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setPage('landing'); // Navigate to landing page on logout
  };

  const value = {
    isAuthenticated: !!token,
    userEmail,
    token,
    page,
    setPage,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
