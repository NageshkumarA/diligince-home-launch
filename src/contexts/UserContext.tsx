
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserProfile, UserRole, UserPreferences, getDashboardRoute } from '@/types/shared';
import { calculateProfileCompleteness, ProfileCompletion } from '@/utils/profileCompleteness';
import { api } from '@/services/api.service';
import { apiRoutes } from '@/services/api.routes';
import { mapApiRoleToUserRole } from '@/utils/roleMapper';
import { mockAuthService } from '@/services/auth/mock-auth.service';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  login: (email: string, password: string) => Promise<{success: boolean, error?: string, isMockAuth?: boolean}>;
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
          console.log("Loaded user from localStorage:", userData);
          setUser(userData);
          setHasCompletedOnboarding(savedOnboarding === 'true');
          
          // Calculate profile completion immediately
          const completion = calculateProfileCompleteness(userData);
          setProfileCompletion(completion);
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
    // Save user data and recalculate profile completion whenever user changes
    if (user) {
      console.log("Saving user to localStorage and recalculating completion:", user);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Recalculate profile completion
      const completion = calculateProfileCompleteness(user);
      console.log("New profile completion:", completion);
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
    
    console.log("Updating profile with:", updates);
    setUser(current => {
      if (!current) return null;
      const updatedUser = {
        ...current,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      console.log("Updated user:", updatedUser);
      return updatedUser;
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

  const login = useCallback(async (email: string, password: string) => {
    try {
      // First, try real API
      console.log('[Auth] Attempting API login...');
      const response: any = await api.post(apiRoutes.auth.login, { email, password });
      
      // Extract from new API structure: { data: { user }, meta: { access_token, refresh_token } }
      const { data, meta } = response?.data ;
      
      if (meta?.access_token && data?.user) {
        console.log('[Auth] API login successful');
        
        // Store both tokens
        localStorage.setItem('authToken', meta.access_token);
        localStorage.setItem('refreshToken', meta.refresh_token);
        localStorage.removeItem('isMockAuth'); // Clear mock auth flag
        
        // Transform API user format to UserContext format
        const apiUser = data.user;
        const userProfile: UserProfile = {
          id: apiUser.id,
          name: apiUser.profile ? `${apiUser.profile.firstName} ${apiUser.profile.lastName}` : apiUser.email,
          email: apiUser.email,
          role: mapApiRoleToUserRole(apiUser.role),
          profile: {
            vendorCategory: apiUser.profile?.vendorCategory,
            companyName: apiUser.profile?.companyName,
            firstName: apiUser.profile?.firstName,
            lastName: apiUser.profile?.lastName,
          },
          preferences: defaultPreferences,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setUser(userProfile);
        setIsFirstTimeUser(!apiUser.profile?.isProfileComplete);
        return { success: true, isMockAuth: false };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error: any) {
      console.warn('[Auth] API login failed, attempting mock login fallback...', error);
      
      // Fallback to mock authentication
      try {
        const mockResponse = await mockAuthService.login(email, password);
        
        if (mockResponse.success && mockResponse.data) {
          console.log('[Auth] Mock login successful');
          const { data, meta } = mockResponse.data;
          
          // Store tokens and set mock auth flag
          localStorage.setItem('authToken', meta.access_token);
          localStorage.setItem('refreshToken', meta.refresh_token);
          localStorage.setItem('isMockAuth', 'true'); // Flag for mock mode
          
          // Transform mock user to UserProfile format
          const apiUser = data.user;
          const userProfile: UserProfile = {
            id: apiUser.id,
            name: apiUser.profile ? `${apiUser.profile.firstName} ${apiUser.profile.lastName}` : apiUser.email,
            email: apiUser.email,
            role: mapApiRoleToUserRole(apiUser.role),
            profile: {
              vendorCategory: apiUser.profile?.vendorCategory,
              companyName: apiUser.profile?.companyName,
              firstName: apiUser.profile?.firstName,
              lastName: apiUser.profile?.lastName,
            },
            preferences: defaultPreferences,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          setUser(userProfile);
          setIsFirstTimeUser(!apiUser.profile?.isProfileComplete);
          return { success: true, isMockAuth: true };
        }
        
        return { success: false, error: mockResponse.error || 'Invalid email or password' };
      } catch (mockError: any) {
        console.error('[Auth] Mock login also failed:', mockError);
        return { 
          success: false, 
          error: 'Authentication system unavailable. Please try again later.' 
        };
      }
    }
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out user");
    setUser(null);
    setIsFirstTimeUser(false);
    setHasCompletedOnboarding(false);
    localStorage.removeItem('user');
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isMockAuth'); // Clear mock auth flag
  }, []);

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
