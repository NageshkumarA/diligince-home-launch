
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserPreferences } from '@/types/shared';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  notifications: {
    email: true,
    push: true,
    sms: false,
    marketing: false,
  },
  language: 'en',
  timezone: 'UTC',
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage on mount
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser) as UserProfile;
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    // Save user data to localStorage whenever user changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    setUser(current => {
      if (!current) return null;
      return {
        ...current,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const updatePreferences = (preferenceUpdates: Partial<UserPreferences>) => {
    if (!user) return;
    
    setUser(current => {
      if (!current) return null;
      return {
        ...current,
        preferences: {
          ...current.preferences,
          ...preferenceUpdates,
        },
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const login = (userData: UserProfile) => {
    const userWithDefaults: UserProfile = {
      ...userData,
      preferences: {
        ...defaultPreferences,
        ...userData.preferences,
      },
    };
    setUser(userWithDefaults);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: UserContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    updateProfile,
    updatePreferences,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
