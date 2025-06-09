
import { useCallback } from 'react';
import { toast } from 'sonner';

interface NotificationOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

interface UseNotificationsReturn {
  showSuccess: (message: string, options?: NotificationOptions) => void;
  showError: (message: string, options?: NotificationOptions) => void;
  showWarning: (message: string, options?: NotificationOptions) => void;
  showInfo: (message: string, options?: NotificationOptions) => void;
  showLoading: (message: string) => string | number;
  dismiss: (toastId: string | number) => void;
  dismissAll: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const showSuccess = useCallback((message: string, options?: NotificationOptions) => {
    toast.success(message, {
      duration: options?.duration,
      position: options?.position,
    });
  }, []);

  const showError = useCallback((message: string, options?: NotificationOptions) => {
    toast.error(message, {
      duration: options?.duration,
      position: options?.position,
    });
  }, []);

  const showWarning = useCallback((message: string, options?: NotificationOptions) => {
    toast.warning(message, {
      duration: options?.duration,
      position: options?.position,
    });
  }, []);

  const showInfo = useCallback((message: string, options?: NotificationOptions) => {
    toast.info(message, {
      duration: options?.duration,
      position: options?.position,
    });
  }, []);

  const showLoading = useCallback((message: string) => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((toastId: string | number) => {
    toast.dismiss(toastId);
  }, []);

  const dismissAll = useCallback(() => {
    toast.dismiss();
  }, []);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    dismissAll,
  };
};
