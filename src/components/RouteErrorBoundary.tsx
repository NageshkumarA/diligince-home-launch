
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useLocation } from 'react-router-dom';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  routeName?: string;
}

const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({ 
  children, 
  routeName 
}) => {
  const location = useLocation();
  
  const customFallback = (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Error Loading {routeName || 'Page'}
        </h1>
        <p className="text-gray-600 mb-4">
          There was an error loading this page. Current route: {location.pathname}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={customFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default RouteErrorBoundary;
