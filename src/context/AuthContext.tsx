import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  name: string;
  role: 'industry' | 'professional' | 'vendor';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Industry login
    if (username === 'industry@deligence.ai' && password === 'Industry@123') {
      setUser({ username, name: 'Tech Solutions Inc.', role: 'industry' });
      return true;
    }
    // Professional login
    if (username === 'professional@deligence.ai' && password === 'Professional@123') {
      setUser({ username, name: 'John Smith', role: 'professional' });
      return true;
    }
    // Vendor login
    if (username === 'vendor@deligence.ai' && password === 'Vendor@123') {
      setUser({ username, name: 'Global Services Ltd.', role: 'vendor' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  const value = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};