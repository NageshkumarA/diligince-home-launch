import React from 'react';
import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface AutoSaveIndicatorProps {
    status: 'idle' | 'saving' | 'saved' | 'error';
    lastSaved: Date | null;
    className?: string;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
    lastSaved,
    className = '',
}) => {
    // Don't show anything if status is idle and never saved
    if (status === 'idle' && !lastSaved) {
        return null;
    }

    const getStatusConfig = () => {
        switch (status) {
            case 'saving':
                return {
                    icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
                    text: 'Saving...',
                    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
                    textColor: 'text-blue-700 dark:text-blue-400',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                };
            case 'saved':
                return {
                    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                    text: lastSaved ? `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}` : 'Saved',
                    bgColor: 'bg-green-50 dark:bg-green-950/20',
                    textColor: 'text-green-700 dark:text-green-400',
                    borderColor: 'border-green-200 dark:border-green-800',
                };
            case 'error':
                return {
                    icon: <AlertCircle className="w-3.5 h-3.5" />,
                    text: 'Save failed',
                    bgColor: 'bg-red-50 dark:bg-red-950/20',
                    textColor: 'text-red-700 dark:text-red-400',
                    borderColor: 'border-red-200 dark:border-red-800',
                };
            default: // idle
                return {
                    icon: <Clock className="w-3.5 h-3.5" />,
                    text: 'Unsaved changes',
                    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
                    textColor: 'text-yellow-700 dark:text-yellow-400',
                    borderColor: 'border-yellow-200 dark:border-yellow-800',
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all duration-300 ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
        >
            {config.icon}
            <span>{config.text}</span>
        </div>
    );
};
