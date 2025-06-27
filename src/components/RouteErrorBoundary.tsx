
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
      <div className="text-center max-w-md">
        <div className="mb-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Error Loading {routeName || 'Page'}
        </h1>
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error while loading this page. This might be due to a navigation issue or missing data.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => window.history.back()}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/industry-dashboard'}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Current route: {location.pathname}
        </p>
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
