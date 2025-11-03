import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useUser } from '@/contexts/UserContext';
import { VerificationStatus } from '@/types/verification';
import { Clock } from 'lucide-react';
import { Button } from './ui/button';

const Layout: React.FC = () => {
  const { isAuthenticated, verificationStatus } = useUser();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto bg-muted/30 relative">
        {/* Verification Status Banner */}
        {verificationStatus === VerificationStatus.PENDING && (
          <div className="bg-orange-100 dark:bg-orange-900/30 border-b border-orange-200 dark:border-orange-800 px-6 py-3 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900 dark:text-orange-200">
                    Verification in Progress
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    Your profile is being verified. Most features are temporarily locked.
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/verification-pending')}
              >
                View Status
              </Button>
            </div>
          </div>
        )}
        
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;