import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useUser } from '@/contexts/UserContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto bg-muted/30">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;