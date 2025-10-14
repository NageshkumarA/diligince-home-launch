import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {api} from '../services/api.service';
import { apiRoutes } from '../services/api.routes';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'IndustryAdmin' | 'IndustryMember' | 'Professional' | 'Vendor' | 'SuperAdmin' | 'Support';
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await api.get(apiRoutes.auth.me);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post(apiRoutes.auth.login, { email, password });
      const {access_token} = response.data?.meta;
      const {user} = response.data?.data;
      debugger
      if (access_token && user) {
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const isAuthenticated = user !== null;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};