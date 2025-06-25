
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFastDataOptions<T> {
  fetchFn: () => Promise<T>;
  cacheKey?: string;
  staleTime?: number;
  retryDelay?: number;
  maxRetries?: number;
}

// Optimized data fetching hook with caching and performance optimizations
export const useFastData = <T>({
  fetchFn,
  cacheKey,
  staleTime = 5 * 60 * 1000, // 5 minutes
  retryDelay = 1000,
  maxRetries = 3
}: UseFastDataOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryCount = useRef(0);
  const cache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (cacheKey) {
        const cached = cache.current.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < staleTime) {
          setData(cached.data);
          setLoading(false);
          return;
        }
      }

      const result = await fetchFn();
      
      // Cache the result
      if (cacheKey) {
        cache.current.set(cacheKey, { data: result, timestamp: Date.now() });
      }
      
      setData(result);
      retryCount.current = 0;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      
      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        setTimeout(fetchData, retryDelay * retryCount.current);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, cacheKey, staleTime, retryDelay, maxRetries]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    if (cacheKey) {
      cache.current.delete(cacheKey);
    }
    fetchData();
  }, [fetchData, cacheKey]);

  return { data, loading, error, refetch };
};
