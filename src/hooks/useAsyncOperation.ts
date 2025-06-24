
import { useState, useCallback } from 'react';
import { useNotifications } from './useNotifications';

interface UseAsyncOperationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const useAsyncOperation = (options: UseAsyncOperationOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  const { showSuccess, showError } = useNotifications();

  const execute = useCallback(async (asyncFn: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await asyncFn();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      if (options.showSuccessToast && options.successMessage) {
        showSuccess(options.successMessage);
      }
      
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      if (options.onError) {
        options.onError(error);
      }
      
      if (options.showErrorToast !== false) {
        showError(options.errorMessage || error.message || 'An error occurred');
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [options, showSuccess, showError]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset
  };
};
