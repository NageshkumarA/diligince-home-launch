import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { VerificationStatus } from '@/types/verification';

export const useProfileVerification = () => {
  const { user, verificationStatus, refreshVerificationStatus } = useUser();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Auto-refresh status every 30 seconds when pending
  useEffect(() => {
    if (verificationStatus === VerificationStatus.PENDING) {
      const interval = setInterval(() => {
        setIsRefreshing(true);
        refreshVerificationStatus().finally(() => setIsRefreshing(false));
      }, 30000); // 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [verificationStatus, refreshVerificationStatus]);
  
  return {
    status: verificationStatus,
    isPending: verificationStatus === VerificationStatus.PENDING,
    isApproved: verificationStatus === VerificationStatus.APPROVED,
    isRejected: verificationStatus === VerificationStatus.REJECTED,
    isIncomplete: verificationStatus === VerificationStatus.INCOMPLETE,
    refresh: refreshVerificationStatus,
    isRefreshing
  };
};
