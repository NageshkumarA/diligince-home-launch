import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import api from '../../../services/api.service';
import { apiRoutes } from '../../../services/api.routes';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = useCallback(async (userData: any) => {
    setIsLoading(true);
    try {
      const response:any = await api.post(apiRoutes.auth.register, userData);

      // Assuming a 201 Created or 200 OK for successful registration
      if (response.status === 201 || response.status === 200) {
        toast({
          title: "Sign-up successful!",
          description: response.data.message || "Your account has been created. Please sign in to continue.",
        });
        
        navigate('/signin');
        return { success: true, user: response.data.user };
      } else {
        toast({
          title: "Sign up failed",
          description: response.data.message || "Unable to create account. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: response.data.message };
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      const message = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast({
        title: "Sign up error",
        description: message,
        variant: "destructive",
      });
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast, navigate]);

  return {
    signUp,
    isLoading
  };
};