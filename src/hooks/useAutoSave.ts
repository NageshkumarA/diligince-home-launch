import { useEffect, useRef, useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export interface UseAutoSaveOptions<T> {
    data: T;
    saveKey: string; // localStorage key
    enabled?: boolean; // Enable/disable auto-save
    interval?: number; // Debounce interval (ms)
    onSave?: (data: T) => void; // Optional callback when data is saved
    onSaveToServer?: (data: T) => Promise<void>; // Optional callback to save to server
}

export interface SaveStatus {
    status: 'idle' | 'saving' | 'saved' | 'error';
    lastSaved: Date | null;
    error?: Error;
}

export function useAutoSave<T>({
    data,
    saveKey,
    enabled = true,
    interval = 15000, // 15 seconds default
    onSave,
    onSaveToServer,
}: UseAutoSaveOptions<T>) {
    const [saveStatus, setSaveStatus] = useState<SaveStatus>({
        status: 'idle',
        lastSaved: null,
    });

    const isInitialMount = useRef(true);
    const previousDataRef = useRef<T | null>(null);

    // Debounce the data to trigger save after user stops editing
    const debouncedData = useDebounce(data, interval);

    /**
     * Save draft to localStorage and/or server
     */
    const saveDraftNow = useCallback(async () => {
        if (!enabled) return;

        try {
            setSaveStatus({ status: 'saving', lastSaved: saveStatus.lastSaved });

            // Prioritize server save if callback provided
            if (onSaveToServer) {
                await onSaveToServer(data);
                console.log(`✅ Auto-saved to server: ${saveKey}`);
            }

            // Also save to localStorage as backup/cache
            const serializedData = JSON.stringify(data);
            localStorage.setItem(saveKey, serializedData);

            const now = new Date();
            setSaveStatus({ status: 'saved', lastSaved: now });

            // Call optional callback
            if (onSave) {
                onSave(data);
            }

            if (!onSaveToServer) {
                // Only log localStorage if not saving to server
                console.log(`✅ Auto-saved to localStorage: ${saveKey}`, data);
            }
        } catch (error) {
            console.error('❌ Auto-save failed:', error);
            setSaveStatus({
                status: 'error',
                lastSaved: saveStatus.lastSaved,
                error: error as Error,
            });
        }
    }, [data, saveKey, enabled, onSave, onSaveToServer, saveStatus.lastSaved]);

    /**
     * Restore draft from localStorage
     */
    const restoreDraft = useCallback((): T | null => {
        try {
            const savedData = localStorage.getItem(saveKey);
            if (!savedData) return null;

            const parsed = JSON.parse(savedData) as T;
            console.log(`📦 Restored draft: ${saveKey}`, parsed);
            return parsed;
        } catch (error) {
            console.error('❌ Failed to restore draft:', error);
            return null;
        }
    }, [saveKey]);

    /**
     * Clear draft from localStorage
     */
    const clearDraft = useCallback(() => {
        try {
            localStorage.removeItem(saveKey);
            setSaveStatus({ status: 'idle', lastSaved: null });
            console.log(`🗑️ Cleared draft: ${saveKey}`);
        } catch (error) {
            console.error('❌ Failed to clear draft:', error);
        }
    }, [saveKey]);

    /**
     * Auto-save when debounced data changes
     */
    useEffect(() => {
        // Skip on initial mount to avoid saving immediately
        if (isInitialMount.current) {
            isInitialMount.current = false;
            previousDataRef.current = data;
            return;
        }

        // Skip if auto-save is disabled
        if (!enabled) {
            return;
        }

        // Deep comparison to check if data actually changed
        const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);

        if (hasChanged) {
            saveDraftNow();
            previousDataRef.current = data;
        }
    }, [debouncedData, enabled, saveDraftNow, data]);

    /**
     * Cleanup on unmount (optional - keep draft for restoration)
     */
    useEffect(() => {
        return () => {
            // Don't clear draft on unmount - we want it to persist
            console.log(`📌 Auto-save hook unmounted for: ${saveKey}`);
        };
    }, [saveKey]);

    return {
        saveStatus,
        restoreDraft,
        clearDraft,
        saveDraftNow,
    };
}
