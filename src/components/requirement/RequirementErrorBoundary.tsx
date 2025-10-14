import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h2>
        <p className="mb-4 text-gray-600">
          {error.message || "An unexpected error occurred. Your progress has been saved."}
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={resetErrorBoundary}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/industry-dashboard'}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

interface RequirementErrorBoundaryProps {
  children: React.ReactNode;
}

export const RequirementErrorBoundary: React.FC<RequirementErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, errorInfo: any) => {
    console.error("Requirement creation error:", error, errorInfo);
    toast.error("An unexpected error occurred. Your progress has been saved.");
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Clear any stale state if needed
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
