import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { VerificationStatus } from '@/types/verification';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, verificationStatus } = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Allow access to Settings page during all statuses
  if (location.pathname.includes('industry-settings')) {
    return <>{children}</>;
  }
  
  // Allow access to verification pending page
  if (location.pathname.includes('verification-pending')) {
    return <>{children}</>;
  }

  // Check verification status for other pages
  if (verificationStatus === VerificationStatus.INCOMPLETE || 
      verificationStatus === VerificationStatus.REJECTED) {
    return <Navigate to="/dashboard/industry-settings" replace />;
  }

  if (verificationStatus === VerificationStatus.PENDING) {
    return <Navigate to="/verification-pending" replace />;
  }

  // Full access for approved users
  return <>{children}</>;
};
