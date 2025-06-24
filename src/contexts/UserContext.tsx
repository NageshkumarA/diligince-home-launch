
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserPreferences, getDashboardRoute } from '@/types/shared';
import { calculateProfileCompleteness, ProfileCompletion } from '@/utils/profileCompleteness';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  getDashboardUrl: () => string;
  isUserType: (role: UserRole) => boolean;
  isVendorCategory: (category: string) => boolean;
  profileCompletion: ProfileCompletion;
  isFirstTimeUser: boolean;
  setFirstTimeUser: (isFirst: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
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

const defaultProfileCompletion: ProfileCompletion = {
  percentage: 0,
  isComplete: false,
  missingFields: [],
  completedFields: []
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState<ProfileCompletion>(defaultProfileCompletion);

  useEffect(() => {
    // Load user data from localStorage on mount
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedOnboarding = localStorage.getItem('hasCompletedOnboarding');
        
        if (savedUser) {
          const userData = JSON.parse(savedUser) as UserProfile;
          setUser(userData);
          setHasCompletedOnboarding(savedOnboarding === 'true');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('hasCompletedOnboarding');
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
      // Calculate profile completion
      const completion = calculateProfileCompleteness(user);
      setProfileCompletion(completion);
    } else {
      localStorage.removeItem('user');
      setProfileCompletion(defaultProfileCompletion);
    }
  }, [user]);

  useEffect(() => {
    // Save onboarding state
    localStorage.setItem('hasCompletedOnboarding', hasCompletedOnboarding.toString());
  }, [hasCompletedOnboarding]);

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
    setIsFirstTimeUser(true);
  };

  const logout = () => {
    setUser(null);
    setIsFirstTimeUser(false);
    setHasCompletedOnboarding(false);
    localStorage.removeItem('user');
    localStorage.removeItem('hasCompletedOnboarding');
  };

  const getDashboardUrl = (): string => {
    if (!user) return '/';
    return getDashboardRoute(user);
  };

  const isUserType = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const isVendorCategory = (category: string): boolean => {
    return user?.role === 'vendor' && user?.profile?.vendorCategory === category;
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
    getDashboardUrl,
    isUserType,
    isVendorCategory,
    profileCompletion,
    isFirstTimeUser,
    setFirstTimeUser: setIsFirstTimeUser,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
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
