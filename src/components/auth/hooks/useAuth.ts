
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { saveUserToRegistry, getUserFromRegistry, checkEmailExists } from '../utils/authUtils';
import { UserProfile } from '@/types/shared';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, getDashboardUrl } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = useCallback(async (userData: UserProfile & { password: string }) => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      if (checkEmailExists(userData.email)) {
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
        toast({
          title: "Sign up failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: "Failed to save user" };
      }

      // Remove password before setting user in context
      const { password, ...userProfile } = userData;
      login(userProfile);
      
      toast({
        title: "Sign-up successful!",
        description: "Welcome to diligince.ai",
      });

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
  }, [login, toast]);

  const signIn = useCallback(async (email: string, password: string) => {
    console.log("signIn called with:", { email, password: "***" });
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Attempting to get user from registry...");
      const user = getUserFromRegistry(email, password);
      console.log("User found:", user ? "YES" : "NO");
      
      if (user) {
        console.log("Logging in user:", user.name);
        login(user);
        
        toast({
          title: "Sign in successful!",
          description: `Welcome back, ${user.name}!`,
        });

        // Redirect to appropriate dashboard
        const dashboardUrl = getDashboardUrl();
        console.log("Redirecting to:", dashboardUrl);
        navigate(dashboardUrl);
        
        return { success: true, user };
      } else {
        console.log("Invalid credentials");
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
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
  }, [login, toast, navigate, getDashboardUrl]);

  return {
    signUp,
    signIn,
    isLoading
  };
};
