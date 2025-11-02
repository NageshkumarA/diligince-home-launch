import React, { useState } from 'react';
import { AlertCircle, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

/**
 * MockAuthBanner
 * Displays a warning banner when using mock authentication
 * Provides option to retry real API connection
 */
export const MockAuthBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();

  // Check if currently using mock auth
  const isMockAuth = localStorage.getItem('isMockAuth') === 'true';

  if (!isMockAuth || !isVisible) {
    return null;
  }

  const handleRetryApi = async () => {
    setIsRetrying(true);
    try {
      // Clear mock auth flag and logout
      localStorage.removeItem('isMockAuth');
      logout();
      
      // Redirect to sign-in to retry with real API
      setTimeout(() => {
        navigate('/signin');
        setIsRetrying(false);
      }, 500);
    } catch (error) {
      console.error('Error retrying API connection:', error);
      setIsRetrying(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember dismissal for this session
    sessionStorage.setItem('mockAuthBannerDismissed', 'true');
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                  Development Mode:
                </span>
                <span className="text-sm text-yellow-700 dark:text-yellow-400">
                  Using mock authentication (Real API unavailable)
                </span>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-0.5">
                Demo accounts are being used for authentication. Some features may have limited functionality.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetryApi}
              disabled={isRetrying}
              className="text-xs h-8 px-3 border-yellow-300 dark:border-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 mr-1.5" />
                  Retry API
                </>
              )}
            </Button>
            
            <button
              onClick={handleDismiss}
              className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-800 dark:hover:text-yellow-300 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
