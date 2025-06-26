
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { saveUserToRegistry, getUserFromRegistry, checkEmailExists, listAllRegisteredUsers } from '../utils/authUtils';
import { UserProfile } from '@/types/shared';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, getDashboardUrl } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const getVendorDashboardUrl = (userRole: string, vendorCategory?: string) => {
    if (userRole === 'vendor' && vendorCategory) {
      switch (vendorCategory) {
        case 'service':
          return '/service-vendor-dashboard';
        case 'product':
          return '/product-vendor-dashboard';
        case 'logistics':
          return '/logistics-vendor-dashboard';
        default:
          return '/service-vendor-dashboard';
      }
    }
    
    switch (userRole) {
      case 'industry':
        return '/industry-dashboard';
      case 'professional':
        return '/professional-dashboard';
      default:
        return '/service-vendor-dashboard';
    }
  };

  const signUp = useCallback(async (userData: UserProfile & { password: string }) => {
    setIsLoading(true);
    
    try {
      console.log("=== SIGNUP PROCESS STARTED ===");
      console.log("User data for signup:", { ...userData, password: "***" });
      
      // Check if email already exists
      if (checkEmailExists(userData.email)) {
        console.log("Email already exists during signup");
        toast({
          title: "Email already exists",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "destructive",
        });
        return { success: false, error: "Email already exists" };
      }

      // Save user to registry
      const saved = saveUserToRegistry(userData);
      
      if (!saved) {
        console.log("Failed to save user during signup");
        toast({
          title: "Sign up failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: "Failed to save user" };
      }

      // Remove password before setting user in context
      const { password, ...userProfile } = userData;
      console.log("User profile to set in context:", userProfile);
      login(userProfile);
      
      toast({
        title: "Sign-up successful!",
        description: "Welcome to diligince.ai",
      });

      // Redirect to appropriate dashboard
      const dashboardUrl = getVendorDashboardUrl(userProfile.role, userProfile.profile?.vendorCategory);
      console.log("Redirecting to dashboard:", dashboardUrl);
      navigate(dashboardUrl);

      console.log("=== SIGNUP PROCESS COMPLETED ===");
      return { success: true, user: userProfile };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign up error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsLoading(false);
    }
  }, [login, toast, navigate]);

  const signIn = useCallback(async (email: string, password: string) => {
    console.log("=== SIGNIN PROCESS STARTED ===");
    console.log("signIn called with email:", email);
    setIsLoading(true);

    try {
      // List all registered users for debugging
      listAllRegisteredUsers();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Attempting to get user from registry...");
      const user = getUserFromRegistry(email, password);
      console.log("User found:", user ? "YES" : "NO");
      
      if (user) {
        console.log("Logging in user:", user.name, "with role:", user.role, "and vendor category:", user.profile?.vendorCategory);
        login(user);
        
        toast({
          title: "Sign in successful!",
          description: `Welcome back, ${user.name}!`,
        });

        // Redirect to appropriate dashboard based on user role and vendor category
        const dashboardUrl = getVendorDashboardUrl(user.role, user.profile?.vendorCategory);
        console.log("Redirecting to dashboard:", dashboardUrl);
        navigate(dashboardUrl);
        
        console.log("=== SIGNIN PROCESS COMPLETED ===");
        return { success: true, user };
      } else {
        console.log("Invalid credentials - no user found");
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        });
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsLoading(false);
    }
  }, [login, toast, navigate]);

  return {
    signUp,
    signIn,
    isLoading
  };
};
